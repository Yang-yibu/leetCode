/**
 * 格式化数字
 * 以0开始的，去掉0；保留两位小数
 * @param {number | string} num
 */
export function formatNum(num) {
  num = num * 1;
  if (num && typeof num === 'number') {
    return num.toFixed(2);
  } else {
    return '0.00';
  }
}
