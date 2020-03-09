/* eslint-disable */

// 冒泡排序
let bubbleSort = (arr) => {
    // 控制循环次数
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            console.log(i);
            // 交换位置，借助临时变量
            let tmp = arr[j];
            if (tmp > arr[j + 1]) {
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    return arr
}

// 最好时间复杂度可为 O(n)
let bubbleSort1 = (arr) => {
    let len = arr.length;
    // 控制次数
    for (let i = len - 1; i > 0; i--) {
        let flag = false;
        for (let j = 0; j < i; j++) {
            console.log(i);
            let tmp = arr[j];
            // 进行过一次交换，说明还可能有需要交换位置
            // 本轮循环
            if (tmp > arr[j + 1]) {
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                flag = true;
            }
        }
        if (!flag) break; // 跳出循环
    }
    return arr;
}

export default bubbleSort1;
// console.log(bubbleSort([13, 19, 16, 1]));
// console.log('============');
// console.log(bubbleSort([1, 4, 5, 6, 7]));
