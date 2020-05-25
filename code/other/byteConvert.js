// for (语句 1; 语句 2; 语句 3) {
//   执行的代码块
// }
// 语句 1：循环开始前执行
// 语句 2：执行循环的条件，true 时执行
// 语句 1：每次循环执行后执行

/**
 * 字节单位换算
 * @param {number} nBytes - 待转换的数字
 * @param {number} unit - 进制
 */
function byteConvert(nBytes, unit = 1024) {
  let sOutput = nBytes + ' bytes';

  const aMultiples = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
  for (var nMultiple = 0, nApprox = nBytes / unit; nApprox > 1; nApprox /= unit, nMultiple++) {
    sOutput = nApprox.toFixed(3) + ' ' + aMultiples[nMultiple] + ' (' + nBytes + ' bytes)';
  }

  console.log(`sOutput-${unit}: ${sOutput}`);
  return sOutput;
}

byteConvert(1000 * 1000 * (1000 + 100), 1000);
byteConvert(1024 * 1024 * (1024 + 100));
