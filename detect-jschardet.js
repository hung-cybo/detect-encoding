const fs = require('fs');
const jschardet = require('jschardet');

function detectEncoding(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    return jschardet.detect(dataBuffer);
}

function main() {
    const args = process.argv.slice(2);
    const filePath = args[0];
    const detectAll = args[1];
    if(!filePath) {
        console.log('Usage: node detect.js filepath.txt');
        return;
    }

    try {
        if(detectAll === 'all') {
            jschardet.enableDebug();
        }

        const detectedResult = detectEncoding(filePath);
        console.log(`Detected encoding: ${detectedResult.encoding} (${detectedResult.confidence})`);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log('Error: The specified file path does not exist.');
        } else {
            console.log(`Error: ${error.message}`);
        }
    }
}

main();
