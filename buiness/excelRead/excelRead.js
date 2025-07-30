const path = require('path');
const ExcelJS = require('exceljs');
const wb = new ExcelJS.Workbook();

const pre = './buiness/excelRead';
const fileName = path.resolve(pre, './t1.xlsx');
wb.xlsx
  .readFile(fileName)
  .then(() => {
    const ws = wb.getWorksheet('Sheet1');

    const json = [];
    const rows = ws.eachRow((rows, row) => {
      const record = [];
      rows.eachCell((cell, col) => {
        let v = cell.value;
        let v2 = v;
        if (col === 1) {
          // indent 缩进字符数，2 个字符表示一个层级
          // 2 个空格表示一个层级
          const indent = cell.alignment.indent || 0;
          v2 = new Array(indent).fill('#').join('') + v;
          if (v2.replace) {
            v2 = v2.replace(/\s{2}/, '#').replace(/\s*/g, '').trimEnd();
          }
        } else {
          v2 = v2.trim ? v2.trim() : v2;
        }

        record.push(v2);
      });
      json.push(record);
    });

    console.log(JSON.stringify(json));
  })
  .catch((err) => {
    console.log(err.message);
  });
