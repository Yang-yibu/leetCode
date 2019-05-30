/**
 * 反转字符串中的单词 reverseWords
 * @param {string} s
 * @return {string}
 */

// export default  function (s) {
//   return s.split(' ').map(item => {
//     return item.split('').reverse().join('')
//   }).join(' ')
// };

// export default  function (s) {
//   return s.split(/\s+/g).map(item => {
//     return item.split('').reverse().join('')
//   }).join(' ')
// };

export default  function (s) {
  return s.match(/[\w']+/g).map(item => {
    return item.split('').reverse().join('')
  }).join(' ')
};
