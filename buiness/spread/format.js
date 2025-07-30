/**
 * @typedef CellMetaOri
 * @property {string} tableName
 * @property {string} fieldName
 * @property {string} dataType
 */
/**
 * @typedef CellMeta
 * @property {string} tableName
 * @property {string} fieldName
 * @property {string} dataType
 * @property {string} sheet
 * @property {number} posRow
 * @property {number} posCol
 */

/**
 * 获取某行所有单元格
 * @param {{[colIdx: string]: CellMeta}} rowCells 所有行
 */
export function getRowCells(rowCells) {
  const cells = [];
  Object.keys(rowCells).map((colIdx) => {
    cells.push(rowCells[colIdx]);
  });
  return cells;
}
/**
 * 获取所有行
 * @param {{[rowIdx: string]: any}} sheet
 */
export function getSheetRows(sheet) {
  const rows = [];
  Object.keys(sheet).map((rowIdx) => {
    rows.push(sheet[rowIdx]);
  });
  return rows;
}
/**
 * 获取搜索 sheet 页
 * @param {[sheet: string]: any} tpl
 */
export function getTpmSheets(tpl) {
  const sheets = [];
  Object.keys(sheets).map((sheetName) => {
    sheets.push(tpl[sheetName]);
  });
  return sheets;
}

export function getInfoStr(...arr) {
  return arr.join('-');
}
export function getInfoArr(str) {
  return str.split('-');
}

/**
 * @param {dataTjfxGc} data
 * @param {string} sheetName
 * @param {string} rowIdx
 * @param {string} colIdx
 */
export function getAllCells(data, { limSheetName, limRowIdx, limColIdx } = {}) {
  let sheetNames = Object.keys(data);
  if (data[limSheetName]) {
    sheetNames = [limSheetName];
  }

  const allCells = [];
  sheetNames.map((sheetName) => {
    Object.keys(data[sheetName]).map((rowIdx) => {
      Object.keys(data[sheetName][rowIdx]).map((colIdx) => {
        const cell = data[sheetName][rowIdx][colIdx];
        cell.sheet = sheetName;
        cell.posRow = rowIdx;
        cell.posCol = colIdx;
        allCells.push(cell);
      });
    });
  });

  return allCells;
}

/**
 * 构建 pos 和 数据库表字段映射信息
 * @param {CellMeta[]} allCells
 */
export function buildMapPos2TF(allCells) {
  const mapPos2TF = {};
  const mapTF2Pos = {};
  allCells.map((cell) => {
    const posStr = getInfoStr(cell.posRow, cell.posCol);
    const tfStr = getInfoStr(cell.tableName, cell.fieldName);

    mapPos2TF[posStr] = [cell.tableName, cell.fieldName];
    mapTF2Pos[tfStr] = [cell.posRow, cell.posCol];
  });
  return { mapPos2TF, mapTF2Pos };
}
