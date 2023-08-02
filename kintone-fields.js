const iconv = require('iconv-lite');

const fields = [
    {type: "Record number", code: "レコード番号"},
    {type: "Created by", code: "作成者"},
    {type: "Created datetime", code: "作成日時"},
    {type: "Updated by", code: "更新者"},
    {type: "Updated datetime", code: "更新日時"},
    {type: "Text", code: "文字列__1行_"},
    {type: "Rich text", code: "リッチエディター"},
    {type: "Text area", code: "文字列__複数行_"},
    {type: "Number", code: "数値"},
    {type: "Calculated", code: "計算"},
    {type: "Radio button", code: "ラジオボタン"},
    {type: "Check box", code: "チェックボックス"},
    {type: "Multi-choice", code: "複数選択"},
    {type: "Drop-down", code: "ドロップダウン"},
    {type: "Date", code: "日付"},
    {type: "Time", code: "時刻"},
    {type: "Date and time", code: "日時"},
    {type: "Attachment", code: "添付ファイル"},
    {type: "Link", code: "リンク"},
    {type: "User selection", code: "ユーザー選択"},
    {type: "Department selection", code: "組織選択"},
    {type: "Group selection", code: "グループ選択"},
    {type: "Related records", code: "関連レコード一覧"},
    {type: "Lookup", code: "ルックアップ"},
    {type: "Field group", code: "グループ"},
    {type: "Table", code: "テーブル"},
];

const specifiedEncoding = 'sjis';
for (const field of fields) {
    const inputData = Buffer.from(field.code);
    const decodedString = iconv.decode(inputData, specifiedEncoding);
    console.log(`Type: ${field.type} | Code: ${field.code} - ${field.code.length} | Decoded Code: ${decodedString} - ${decodedString.length}`);
}