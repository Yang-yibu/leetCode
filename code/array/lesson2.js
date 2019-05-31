function gcd(a, b) {
  if (b === 0) {
    return a;
  } else {
    return gcd(b, a % b)
  }
}
// export { gcd };

/**
 * 
 * @param { number[] } arr
 * @returns { boolean }
 */
let cardGroup = (arr) => {
  // 1. 排序 相同的放在一起，方便分组：1122333
  // 2. 相同的数字分成一组 ：[11] [22] [3333]
  // 3. 找最大公约数 X
  // 4. X >=2 返回 true
  
  let sortArr = arr.sort((a, b) => a - b).join('');
  // 分组 单张或多张牌
  let groups = sortArr.match(/(\d)\1+|\d/g);
  
  while (groups.length >= 2) {
    let a = groups.shift(groups[0]).length;
    let b = groups.shift(groups[0]).length;
    let v = gcd(a, b);
    
    if (v === 1) {
      // 一旦其中某两项的最大公约数是 1，不符合要求
      return false;
    } else {
      // 放入最大公约数个 字符；继续找前两个数组的最大公约数
      groups.unshift('0'.repeat(v))
    }
  }
  
  // 卡牌分组大于 0 ; 
  return groups.length > 0 ? groups[0].length >= 2 : false;
}
export default cardGroup;
// debugger
// console.log(cardGroup([1, 2, 3, 4, 4, 3, 2, 1]))