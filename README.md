# detect-encoding

This repo is used to test the encoding detection

## Usage

```bash
node index.js <file-path> [encoding]
```

## Example

Should print the decoded content of the file

```bash
node index.js files/test-utf8-jp.csv utf8
```

```bash
node index.js files/test-utf8-normal.csv utf8
```

```bash
node index.js files/test-utf8-normal.csv sjis
```

```bash
node index.js files/test-shift_jis.csv sjis
```

Should throw an error due to the wrong encoding

```bash
node index.js files/test-utf8-jp.csv sjis
```

```bash
node index.js files/test-shift_jis.csv utf8
```