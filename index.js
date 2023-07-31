const fs = require('fs');
const jschardet = require('jschardet');
const iconv = require('iconv-lite');

// Map for encoding names between jschardet and iconv-lite
const encodingMapping = {
    'utf8': 'UTF-8',
    'sjis': 'Shift_JIS',
};

function detectEncoding(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const detectedResult = jschardet.detect(dataBuffer);
    console.log(`Detected encoding: ${detectedResult.encoding} (${detectedResult.confidence})`);
    return detectedResult.encoding;
}

function main() {
    const args = process.argv.slice(2);
    const filePath = args[0];
    const specifiedEncoding = args[1] || 'utf8';
    if(!filePath || !specifiedEncoding) {
        console.log('Usage: node index.js test-shift_jis.txt utf8');
        return;
    }

    try {
        const rawData = fs.readFileSync(filePath);
        const actualEncoding = detectEncoding(filePath);
        const mappedEncoding = encodingMapping[specifiedEncoding] || specifiedEncoding;

        if (actualEncoding.toLowerCase() !== mappedEncoding.toLowerCase()) {
            console.log(`Error: Mismatch of encoding. The file seems to be in '${actualEncoding}' encoding, not '${specifiedEncoding}'.`);
        } else {
            const decodedContent = iconv.decode(rawData, specifiedEncoding);
            console.log(decodedContent);
        }
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('Error: The specified file path does not exist.');
        } else {
            console.log(`Error: ${error.message}`);
        }
    }
}

main();
