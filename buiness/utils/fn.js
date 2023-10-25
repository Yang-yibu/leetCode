/**
 * 提取函数体，转为字符串
 * @param {Function} fn
 */
export function extraFnBody(fn) {
  const fnStr = fn.toString();
  const fnBody = fnStr.replace(/function.*?\{(.*)\}/g, '$1');
  return fnBody;
}
/**
 * 执行函数体字符串
 * - 场景：根据设置的转换函数处理返回结果
 * @param {string} fnBodyStr
 * @param {any} data
 */
export function execFnBodyStr(data, fnBodyStr) {
  // eslint-disable-next-line no-new-func
  let func = new Function('data', fnBodyStr || 'return data');

  return func(data);
}

/**
 * 根据属性路径，获取值
 * @param {} data
 * @param {string} path
 */
export function getValByPath(data, path) {
  let _path = '.' + path;
  if (path.startsWith('[')) {
    _path = path;
  }
  // eslint-disable-next-line no-new-func
  let func = new Function('data', 'return data' + _path);

  return func(data);
}

/** 分割数组，返回二维数组 */
// export function groupArray(arr: any[] = [], subGroupLen: number) {
export function groupArray(arr = [], subGroupLen) {
  if (!subGroupLen) return [arr];
  let index = 0;
  const newArray = [];
  while (index < arr.length) {
    newArray.push(arr.slice(index, (index += subGroupLen)));
  }
  return newArray;
}

/**
 * 根据分页信息，将列表分为三部分
 * @param d 列表
 * @param i 当前页
 * @param size 每页数量
 */
// export function sliceListOfPages(d: any[] = [], i: number, size: number) {
export function sliceListOfPages(d = [], i, size) {
  // var d = [0, 1]; var i = 1, size = 2;
  // var start = (i - 1)*size;
  // console.log(d.slice(0, start), d.slice(start, start + size), d.slice(start + size))
  const start = (i - 1) * size;
  const prev = d.slice(0, start);
  const curr = d.slice(start, start + size);
  const next = d.slice(start + size);
  return [prev, curr, next];
}
