/**
 * 判断前后 value 表示的文档是否一致
 * - 不考虑中间有空的情况
 * @example
 * ```js
 * arrEleEquals("12,,23", "12,23") => false
 * arrEleEquals("12,23", "23") => false
 * arrEleEquals("12,23", "23,12") => true
 * ```
 */
export function arrEleEquals(valStr = '', valStr1 = '') {
  const val1 = valStr.split(',');
  const val2 = valStr1.split(',');

  if (val1.length !== val2.length) {
    return false;
  }

  for (let i = 0; i < val2.length; i++) {
    const ele = val2[i];
    if (val1.indexOf(ele) === -1) {
      // v2 中有元素在 v1 中找不到
      return false;
    }
  }
  return true;
}
