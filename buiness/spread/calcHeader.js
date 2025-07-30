/**
 * @typedef {{row: number, col: number, rowCount: number, colCount: number}} Range
 */
/**
 * @typedef {[row: number, col: number, rowCount: number, colCount: number]} RangeArr
 */

import { getInfoStr } from './format';

/**
 * 获取单元格文字
 * @param {Range} range
 * @param {Range[]} mergeSpans
 */
export function getRangeCells(range) {
  const { row, col, rowCount, colCount } = range;

  const cells = [];
  for (let ri = 0; ri < rowCount; ri++) {
    const rowIdx = row + ri;
    const rowCells = [];
    for (let ci = 0; ci < colCount; ci++) {
      const colIdx = col + ci;

      rowCells.push([rowIdx, colIdx]);
    }

    cells.push(rowCells);
  }

  return cells;
}

/** 获取被合并的单元格的取值 */
export function getMergedFactCell(mergeSpans) {
  const mergedCells = {};
  mergeSpans.map((item) => {
    const fact = [item.row, item.col];

    getRangeCells(item).map((row) => {
      row.map((cell) => {
        mergedCells[getInfoStr(...cell)] = fact;
      });
    });
  });
  return mergedCells;
}

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

}
