export function getField(prefix = '', x = '', y = '', offsetX = 0, offsetY = 0) {
  let _x = x;
  let _y = y;
  if (!isNaN(parseFloat(x)) && isFinite(x)) {
    _x = Number(x) + offsetX;
  }
  if (!isNaN(parseFloat(y)) && isFinite(y)) {
    _y = Number(y) + offsetY;
  }
  if (x && y) {
    return `${prefix}${_x}_${_y}`;
  }
  return `${prefix}${_x}${_y}`;
}

export function batchFieldName(prefix, x, y) {
  return (prefix || '') + [x, y].filter((v) => v).join('_');
}
