/* eslint-disable */

let selectionSort = (arr) => {
    let start = 0, len = arr.length;

    // 控制排序次数
    while (start < len) {
        let curMin = start;

        for (let i = start + 1; i < len; i++) {
            if (arr[curMin] > arr[i]) {
                curMin = i;
            }
        }
        if (start !== curMin) {
            let tmp = arr[start];
            arr[start] = arr[curMin];
            arr[curMin] = tmp;
        }
        start++;
    }
    return arr;
}

let selectionSort2 = (arr) => {
    for (let i = 0, len = arr.length, minVal; i < len; i++) {
        minVal = arr[i];

        for (let j = i + 1; j < len; j++) {
            if (arr[j] < minVal) {
                let tmp = minVal;
                minVal = arr[j];
                arr[j] = tmp;
            }
        }

        if (arr[i] !== minVal) arr[i] = minVal;
    }
    return arr
}

export default selectionSort;
// debugger
// console.log(selectionSort([1, 9, 5, 3, 4]));
// console.log(selectionSort([4, 2, 5, 7, 1, 6]));
//
