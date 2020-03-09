/* eslint-disable */

/**
 * 重复的子字符串
 * @param {string} str 待测试字符串
 * @return {boolean}
 */
let repeatSubstring = (str) => {
    let reg = /^(\w+)\1+$/;
    return reg.test(str);
}

export default repeatSubstring;
// console.log(repeatSubstring('abcabc'))
// console.log(repeatSubstring('abc'))
