
/**
 * @param {number[]} flowerbed 花坛 [1, 0, 0, 0, 1]
 * @param {number} n 能不能种 n 朵花 2
 * @return {boolean}
 */
// let canPlaceFlowers = function (arr, n) {
//     // let tmp = [];
//     let tmp = 0;

//     if (arr.length === 1 && arr[0] === 0) {
//         return true
//     }

//     for (let i = 0, len = arr.length; i < len; i++) {
//         if (
//             (i === 0 && arr[i] === 0 && arr[i + 1] === 0)
//             ||
//             (arr[i] === 0 && arr[i - 1] === 0 && arr[i + 1] === 0)
//             ||
//             (i === (len - 1) && arr[i - 1] === 0 && arr[i] === 0)
//         ) {
//             arr[i] = 1;
//             // tmp.push(i);
//             tmp += 1;
//         }
//     }

//     return tmp >= n;
// }

let canPlaceFlowers = function (arr, n) {
    let count = 0; // 计数器

    arr.push(0);
    for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i] !== 0) continue;

        if (
            (i === 0 && arr[i + 1] === 0)
            ||
            (arr[i - 1] === 0 && arr[i + 1] === 0)
        ) {
            count++;
            i++;
        }
    }

    return count >= n;
}

export default canPlaceFlowers;
// debugger
// var a = canPlaceFlowers([1, 0, 0, 0, 0, 0, 1], 2)
// console.log(a);
