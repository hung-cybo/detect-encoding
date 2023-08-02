const fs = require('fs');
const iconv = require('iconv-lite');

const detectMismatchedEncoding = (inputData, specifiedEncoding) => {
    // Attempt to decode the input data with the specified encoding
    const decodedString = iconv.decode(inputData, specifiedEncoding);

    // Re-encode the decoded string back to a buffer using the specified encoding
    const reEncodedBuffer = iconv.encode(decodedString, specifiedEncoding);

    // Compare the re-encoded buffer with the original decoded buffer
    // console.log("inputDataString", inputData.toString());
    // console.log("decodedString", decodedString);
    // console.log("reEncodedString", reEncodedBuffer.toString());
    // console.log("inputData", inputData);
    // console.log("decodedBu", Buffer.from(decodedString));
    // console.log("reEncoded", reEncodedBuffer);

    if (decodedString.includes('�') || decodedString.includes('?')) {
        console.warn('Warning: Mismatched encoding detected due to untranslatable characters.');
        return true;
    } else {
        const _isValidInBothEncodings = isValidInBothEncodings(inputData);
        if(_isValidInBothEncodings){
            // This is a valid encoding in both UTF-8 and the specified encoding but the decoded string is different
            return decodedString !== reEncodedBuffer.toString();
        }
    }

    return false;
}

const isValidEncoding = (inputString, specifiedEncoding) => {
    // Check if the decoded string contains characters outside the expected range for the specified encoding
    const isValidEncoding = Array.from(inputString).every((char) => {
        const charCode = char.charCodeAt(0);
        if (specifiedEncoding === 'sjis') {
            // For Shift-JIS, check if the character is in the expected range
            return isValidSJIS(charCode);
        } else if (specifiedEncoding === 'utf8') {
            // For UTF-8, check if the character is a valid Unicode character
            return isValidUTF8(charCode)    ;
        } else {
            // For other encodings, consider the encoding valid
            return true;
        }
    });

    if (!isValidEncoding) {
        return true;
    }
}

const isValidSJIS = (charCode) => {
    return (
        charCode === 0x7f ||
        (charCode >= 0x00 && charCode <= 0x1f) ||
        (charCode >= 0x20 && charCode <= 0x7e) ||
        (charCode >= 0xa1 && charCode <= 0xdf) ||
        (charCode >= 0x81 && charCode <= 0x9f) ||
        (charCode >= 0xe0 && charCode <= 0xef) ||
        (charCode >= 0x40 && charCode <= 0x7e) ||
        (charCode >= 0x80 && charCode <= 0xfc));
}

const isValidUTF8 = (charCode) => {
    return charCode <= 0x10FFFF;
}

const isValidInBothEncodings = (inputString) => {
    const utf8Buffer = Buffer.from(inputString, 'utf8');
    const sjisBuffer = iconv.encode(inputString, 'sjis');

    const utf8Decoded = iconv.decode(utf8Buffer, 'utf8');
    const sjisDecoded = iconv.decode(sjisBuffer, 'sjis');
    return utf8Decoded === sjisDecoded;
}

function main() {
    const args = process.argv.slice(2);
    const filePath = args[0];
    const specifiedEncoding = args[1];
    if(!filePath || !specifiedEncoding) {
        console.log('Usage: node index.js <file-path> <encoding>');
        return;
    }

    try {
        const dataBuffer = fs.readFileSync(filePath);
        const isMismatch = detectMismatchedEncoding(dataBuffer, specifiedEncoding);
        if(isMismatch) {
            console.log('ERROR: Mismatched encoding detected.');
            console.log(`The file "${filePath}" is not encoded in ${specifiedEncoding}.`);
            return;
        }

        console.log(`The file "${filePath}" is encoded in ${specifiedEncoding}.`);
        const decodedContent = iconv.decode(dataBuffer, specifiedEncoding);
        console.log(decodedContent);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('Error: The specified file path does not exist.');
        } else {
            console.log(`Error: ${error.message}`);
        }
    }
}

main();
