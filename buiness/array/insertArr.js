export function arrInsertAfter(arr, iarr, idx) {
  if (idx === undefined || typeof idx !== 'number') return arr;
  if (idx < 0 || idx > arr.length - 1) return arr;

  const next = arr.slice(idx + 1);
  arr.splice(idx + 1);
  arr = arr.concat(iarr, next);

  return arr;
}

export function arrInsertAfter2(arr, iarr, _idx) {
  let idx = _idx;
  if (idx === undefined || typeof idx !== 'number') return arr;
  // if (idx === undefined || typeof idx !== 'number') idx = arr.length;

  if (idx < 0) {
    arr.unshift(...[].concat(iarr));
    return arr;
  }
  if (idx > arr.length - 1) {
    arr.push(...[].concat(iarr));
    return arr;
  }

  const next = arr.slice(idx + 1);
  arr.splice(idx + 1);
  // arr = arr.concat(iarr, next);
  arr.push(...[].concat(iarr, next));

  return arr;
}
