/* eslint-disable */
/**
 * 反转字符串中的单词 reverseWords
 * @param {string} s
 * @return {string}
 */

// export default function (s) {
//   return s.split(' ').map(item => {
//     return item.split('').reverse().join('')
//   }).join(' ')
// };

// export default function (s) {
//   return s.split(/\s+/g).map(item => {
//     return item.split('').reverse().join('')
//   }).join(' ')
// };

// 这种方式可能不太通用
// 字符串中如果有其他字符的话需要改正则表达式
export default function reverseWords (s) {
  console.log(s.match(/[\w']+/g))
  return s.match(/[\w']+/g).map(item => {
    return item.split('').reverse().join('')
  }).join(' ')
};
