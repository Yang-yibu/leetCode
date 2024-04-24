import { ABCatNum, chatatABC } from './abcNum';

/**
 * 坐标转文字
 * @param {number} row
 * @param {number} col
 */
export function pos2txt(row, col) {
  var r = row;
  var c = col;
  if (Array.isArray(row)) {
    r = row[0];
    c = row[1];
  }
  return chatatABC(c) + (r + 1);
}

/**
 * 文字转坐标，为匹配到行列坐标返回 [0,0]
 * @param {number} row
 * @param {number} col
 */
export function txt2pos(txt = '') {
  const m = txt.match(/([a-zA-Z]+)(\d+)/);
  if (!m) {
    return [0, 0];
  }

  const col = m[1];
  const row = m[2];

  return [row - 1, ABCatNum(col)];
}
