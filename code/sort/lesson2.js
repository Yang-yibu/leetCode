/* eslint-disable */

/**
 * 数组中第 K 个最大元素
 * @param {number[]} numArr 未排序数组
 * @param {*number} k 第 K 个最大元素
 */
let findKthLargest = function (numArr, k) {
    // 当数组比较大，且 k 小的时候，性能比较差
    if (k < 1 || k > numArr.length) return false;

    // a - b > 0: a 在后边
    let arr = numArr.sort((a, b) => b - a);

    return arr[k - 1];
}

// 冒泡排序：优化性能
let findKthLargest1 = function (numArr, k) {
    let len = numArr.length;

    for (let i = len - 1; i >= len - k; i--) {
        for (let j = 0; j < i; j++) {
            let tmp = numArr[j];
            if (tmp > numArr[j + 1]) {
                numArr[j] = numArr[j + 1];
                numArr[j + 1] = tmp;
            }
        }
    }
    return numArr[len - k]

    // for (let i = len - 1; i > 0; i--) {
    //     for (let j = 0; j < i; j++) {
    //         let tmp = numArr[j];
    //         if (tmp > numArr[j + 1]) {
    //             numArr[j] = numArr[j + 1];
    //             numArr[j + 1] = tmp;
    //         }
    //     }
    //     if (i === (len - k)) {
    //         console.log(numArr);
    //         return numArr[ len - k ]
    //     }
    // }
}

// 选择排序版本
// 求第 K 个最大
let findKthLargest2 = (arr, k) => {

    let len = arr.length;
    for (let i = 0; i < k; i++) {
        let curMaxIdx = i; // 未排序列表的起始位置
        for (let j = i + 1; j < len; j++) {
            if (arr[curMaxIdx] < arr[j]) { // 标记最大的
                curMaxIdx = j;
            }
        }

        if (curMaxIdx !== i) {
            let tmp = arr[i];
            arr[i] = arr[curMaxIdx];
            arr[curMaxIdx] = tmp;
        }
    }
    return arr[k - 1];
}

export default findKthLargest2;

// console.log(findKthLargest2([3, 2, 1, 5, 6, 4], 2))
