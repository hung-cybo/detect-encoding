const iconv = require('iconv-lite');

function isValidInBothEncodings(word) {
    const utf8Buffer = Buffer.from(word, 'utf-8');
    const sjisBuffer = iconv.encode(word, 'shift_jis');

    const utf8Decoded = iconv.decode(utf8Buffer, 'utf-8');
    const sjisDecoded = iconv.decode(sjisBuffer, 'shift_jis');
    console.log("utf8Decoded", utf8Decoded);
    console.log("sjisDecoded", sjisDecoded);
    return utf8Decoded === sjisDecoded;
}

// Example usage
const word1 = 'レコード番号'; // This is valid in both UTF-8 and Shift-JIS
const word2 = '繝ｬ繧ｳ繝ｼ繝臥分蜿ｷ'; // This is valid in both UTF-8 and Shift-JIS

console.log(isValidInBothEncodings(word1)); // Output: true
console.log(isValidInBothEncodings(word2)); // Output: true
