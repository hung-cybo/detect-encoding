# detect-encoding

This repo is used to test the encoding detection

## Usage

```bash
node index.js <file-path> [encoding]
```

## Example

Should print the decoded content of the file

```bash
node index.js test-utf8.txt utf8
```

```bash
node index.js test-shift_jis.txt sjis
```

Should throw an error due to the wrong encoding

```bash
node index.js test-utf8.txt sjis
```

```bash
node index.js test-shift_jis.txt utf8
```