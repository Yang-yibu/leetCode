/* eslint-disable */

// 常规 sort 排序
let maxGap = (arr) => {
    let len = arr.length;
    // 题目要求 数组长度小于 2 返回 0
    if (len < 2) return 0;

    arr = arr.sort((a, b) => a - b);

    let tmpMax = 0;
    // len - 1: 内部 i+1 ，边界条件
    for (let i = 0; i < len - 1; i++) {
        let dVal = arr[i + 1] - arr[i];
        if (dVal > tmpMax) {
            tmpMax = dVal;
        }
    }
    return tmpMax;
}

// 冒泡排序
let maxGap1 = (arr) => {
    let len = arr.length;
    if (len < 2) return 0;

    // 冒泡排序顺带计算差值
    let tmpMax = 0;

    // for (let i = len - 1; i >= 0; i--) {
    for (let i = len - 1; i > 0; i--) {
        // console.log(i);
        for (let j = 0; j < i; j++) {
            let tmp = arr[j];
            if (tmp > arr[j + 1]) {
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }

        // 边界条件：第一轮循环的时候，只找出一个最大值，不能作比较
        if (i === len - 1) continue

        let dVal = arr[i + 1] - arr[i];
        if (dVal > tmpMax) {
            tmpMax = dVal;
        }
    }
    // if ((arr[1] - arr[0]) > tmpMax) tmpMax = arr[1] - arr[0];

    // return tmpMax;

    return Math.max(tmpMax, arr[1] - arr[0])
}

// 选择排序
let maxGap2 = (arr) => {
    let len = arr.length;
    if (len < 2) return 0;

    // 当前最大间距
    let curMaxGap = 0, i = 0;

    // 选择排序找最大
    while ( i < len ) {
        let maxValIdx = i; // 每次都是当前起始位置
        for (let j = i + 1; j < len - 1; j++) {
            // 选择最大的放前边
            if (arr[maxValIdx] < arr[j]) {
                maxValIdx = j;
            }
        }
        if (maxValIdx !== i) {
            let tmp = arr[i];
            arr[i] = arr[maxValIdx];
            arr[maxValIdx] = tmp;
        }

        if (i > 0) {
            let dVal = arr[i - 1] - arr[i];
            if (dVal > curMaxGap) {
                curMaxGap = dVal
            }
        }
        i++;
    }
    return curMaxGap;
}

export default maxGap2;
// debugger
// console.log(maxGap2([3, 6, 9, 1]));
// console.log(maxGap2([13, 16, 19, 1]));
