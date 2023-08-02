const fs = require('fs');
const iconv = require('iconv-lite');

function main() {
    const args = process.argv.slice(2);
    const filePath = args[0];
    const specifiedEncoding = args[1];
    if(!filePath || !specifiedEncoding) {
        console.log('Usage: node read.js <file-path> <encoding>');
        return;
    }

    try {
        const rawData = fs.readFileSync(filePath);
        const decodedContent = iconv.decode(rawData, specifiedEncoding);
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
