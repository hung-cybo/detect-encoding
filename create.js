const fs = require('fs');
const iconv = require('iconv-lite');

function main() {
    const args = process.argv.slice(2);
    const filePath = args[0];
    const specifiedEncoding = args[1];
    if(!filePath || !specifiedEncoding) {
        console.log('Usage: node create.js <file-path> <encoding>');
        return;
    }

    try {
        const content = `こんにちは！`;
        const encodedContent = iconv.encode(content, specifiedEncoding);
        fs.writeFileSync(filePath, encodedContent);
        console.log(`File "${filePath}" created with Shift JIS encoding.`);
    } catch (error) {
        console.error(`Error creating the file: ${error.message}`);
    }
}

main();
