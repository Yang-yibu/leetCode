/* eslint-disable */

import selectionSort from "./lesson1-2";

// 奇数位只能放奇数；偶数位只能放偶数

let sortArray = (arr) => {

    let len = arr.length;
    if (len > 20000 && len < 2) return;

    // 可以不用排序，答案并没有要求 奇偶数的顺序
    // arr = selectionSort(arr);
    arr = arr.sort((a, b) => a - b);

    let tmp = [], tmp1 = 0, tmp2 = 1;

    for (let i = 0; i < len; i++) {
        if (arr[i] % 2 === 0) {
            tmp[tmp1] = arr[i];
            tmp1 += 2;
        } else {
            tmp[tmp2] = arr[i];
            tmp2 += 2;
        }
    }

    return tmp;
}

let sortArray2 = (arr) => {
    // 进行升序排序
    arr.sort((a, b) => a - b)
    // 声明一个空数组用来存储奇偶排序后的数组
    let r = []
    // 记录奇数、偶数位下标
    let odd = 1
    let even = 0
    // 对数组进行遍历
    arr.forEach(item => {
        if (item % 2 === 1) {
            r[odd] = item
            odd += 2
        } else {
            r[even] = item
            even += 2
        }
    })
    return r
}

export default sortArray;

// console.log(sortArray([4,2,5,7]))
