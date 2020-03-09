/* eslint-disable */
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

// let cardGroup = (arr) => {
//   // 1. 排序 相同的放在一起，方便分组：1122333
//   // 2. 相同的数字分成一组 ：[11] [22] [3333]
//   // 3. 找最大公约数 X
//   // 4. X >=2 返回 true

//   let sortArr = arr.sort((a, b) => a - b).join('');
//   // 分组 单张或多张牌
//   // let groups = sortArr.match(/(\d)\1+|\d/g);
//   let groups = sortArr.match(/(\d)\1*/g);

//   while (groups.length >= 2) {
//     let a = groups.shift().length;
//     let b = groups.shift().length;
//     let v = gcd(a, b);

//     if (v === 1) {
//       // 一旦其中某两项的最大公约数是 1，不符合要求
//       return false;
//     } else {
//       // 放入最大公约数个 字符；继续找前两个数组的最大公约数
//       groups.unshift('0'.repeat(v))
//     }
//   }

//   // 卡牌分组大于 0 ;
//   return groups.length > 0 ? groups[0].length >= 2 : false;
// }

let cardGroup = (arr) => {
    // 1. 直接记录每张牌的个数
    // 2. 将其转成数组
    // 3. 找最大公约数 X
    // 4. X >=2 返回 true

    let groups = [], tmp = {};
    arr.forEach(item => {
        tmp[item] = tmp[item] ? tmp[item] + 1 : 1;
    });
    for (let vKey in tmp) {
        groups.push(tmp[vKey]);
    }

    while (groups.length >= 2) {
        let a = groups.shift();
        let b = groups.shift();
        let v = gcd(a, b);

        if (v === 1) {
            // 一旦其中某两项的最大公约数是 1，不符合要求
            return false;
        } else {
            // 放入最大公约数个 字符；继续找前两个数组的最大公约数
            // groups.unshift('0'.repeat(v))
            groups.unshift(v)
        }
    }

    // 卡牌分组大于 0 ;
    return groups.length > 0 ? groups[0] >= 2 : false;
}

export default cardGroup;
// debugger
// console.log(cardGroup([1, 2, 3, 4, 4, 3, 2, 1]))

// var a = cardGroup(
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 8, 8, 8, 9, 9, 9, 10, 10, 10]
// )
// console.log(a);
// console.log(cardGroup([1, 2, 3, 4, 4, 3, 2, 1]));
