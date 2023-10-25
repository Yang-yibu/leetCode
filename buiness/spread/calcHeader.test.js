import { getMergedFactCell, getRangeCells } from './calcHeader';
import { getInfoStr } from './format';

// 选中行 sheet.getSelections()
const selections = [
  {
    row: 0,
    rowCount: 2,
    col: 0,
    colCount: 11,
  },
];

// 合并行 sheet.getSpans()
const mergeSpans = [
  {
    row: 0,
    rowCount: 2,
    col: 0,
    colCount: 1,
  },
  {
    row: 0,
    rowCount: 2,
    col: 1,
    colCount: 1,
  },
  {
    row: 0,
    rowCount: 2,
    col: 2,
    colCount: 1,
  },
  {
    row: 0,
    rowCount: 1,
    col: 3,
    colCount: 8,
  },
  {
    row: 0,
    rowCount: 1,
    col: 11,
    colCount: 8,
  },
];

const mergedCells = getMergedFactCell(mergeSpans);
console.log(mergedCells);

const cellpos = getRangeCells(selections[0]);
console.log(cellpos);

function getColHeader(sheet) {
  const mergedCellPos = {
    '0-0': [0, 0],
    '1-0': [0, 0],
    '0-1': [0, 1],
    '1-1': [0, 1],
    '0-2': [0, 2],
    '1-2': [0, 2],
    '0-3': [0, 3],
    '0-4': [0, 3],
    '0-5': [0, 3],
    '0-6': [0, 3],
    '0-7': [0, 3],
    '0-8': [0, 3],
    '0-9': [0, 3],
    '0-10': [0, 3],
    '0-11': [0, 11],
    '0-12': [0, 11],
    '0-13': [0, 11],
    '0-14': [0, 11],
    '0-15': [0, 11],
    '0-16': [0, 11],
    '0-17': [0, 11],
    '0-18': [0, 11],
  };
  const allCellPos = [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [0, 5],
      [0, 6],
      [0, 7],
      [0, 8],
      [0, 9],
      [0, 10],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [1, 6],
      [1, 7],
      [1, 8],
      [1, 9],
      [1, 10],
    ],
  ];

  const colHeader = {};
  allCellPos.map((row) => {
    row.map((col) => {
      const colIdx = col[1];
      const strPos = col.join('-');
      const _pos = mergedCellPos[strPos] || col;

      const text = sheet.getText(_pos[0], _pos[1]);

      if (!colHeader[colIdx]) {
        colHeader[colIdx] = [];
      }
      colHeader[colIdx].push(text);
    });
  });

  console.log(colHeader);
}
