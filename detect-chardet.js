const fs = require('fs');
const chardet = require('chardet');
const util = require('util')

function detectEncoding(filePath, detectAll) {
    const dataBuffer = fs.readFileSync(filePath);
    if(detectAll){
        return chardet.analyse(dataBuffer);
    }
    return chardet.detect(dataBuffer);
}

function main() {
    const args = process.argv.slice(2);
    const filePath = args[0];
    const detectAll = args[1] === 'all'
    if(!filePath) {
        console.log('Usage: node detect.js <file-path>');
        return;
    }

    try {
        const encoding = detectEncoding(filePath, detectAll);
        console.log(`Detected encoding: ${util.inspect(encoding, false, null, true /* enable colors */)}`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('Error: The specified file path does not exist.');
        } else {
            console.log(`Error: ${error.message}`);
        }
    }
}

main();
