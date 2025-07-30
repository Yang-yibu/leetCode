// lucksheet utils

/**
 * 列下标 字母转数字
 * @param {string} a
 * @returns 下标，从0开始
 */
export function ABCatNum(a) {
  // return ret;
  // eslint-disable-next-line eqeqeq
  if (a == null || a.length == 0) {
    return NaN;
  }
  var str = a.toLowerCase().split('');
  var num = 0;
  var al = str.length;
  var getCharNumber = function (charx) {
    return charx.charCodeAt() - 96;
  };
  var numout = 0;
  var charnum = 0;
  for (var i = 0; i < al; i++) {
    charnum = getCharNumber(str[i]);
    numout += charnum * Math.pow(26, al - i - 1);
  }
  // console.log(a, numout-1);
  // eslint-disable-next-line eqeqeq
  if (numout == 0) {
    return NaN;
  }
  return numout - 1;
}

/**
 * 列下标 数字转字母
 * @param {number} n 下标，从0开始
 * @returns
 */
export function chatatABC(n) {
  var orda = 'a'.charCodeAt(0);
  var ordz = 'z'.charCodeAt(0);
  var len = ordz - orda + 1;
  var s = '';
  while (n >= 0) {
    s = String.fromCharCode((n % len) + orda) + s;
    n = Math.floor(n / len) - 1;
  }

  return s.toUpperCase();
}
