/* eslint-disable */

/**
 * 基础：快速排序
 * @param {number[]} arr
 */
let quickSort = function (arr) {
    function sort(arr) {
        let len = arr.length;
        if (len < 2) {
            return arr;
        } else {
            // 选择基准标尺: 通常情况下
            let flag = arr[0];
            let left = [], right = [];

            for (let i = 1, tmp; i < len; i++) {
                tmp = arr[i];
                if (tmp < flag) {
                    left.push(tmp);
                } else {
                    right.push(tmp)
                }
            }

            return sort(left).concat(flag, sort(right))
        }

    }

    return sort(arr);
}

// in-place 原地算法：
let quickSort1 = function (arr) {

    /**
     * 交换位置
     * @param {array} arr
     * @param {number} i
     * @param {number} j
     */
    let swap = function (arr, i, j) {
        let tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }

    /**
     * 划分交换，找出下一个标尺元素的位置
     * 找当前数组段的中间位置：此位置左边比当前位置小，右边比当前位置大
     * @param {array} arr
     * @param {number} left
     * @param {number} right
     */
    let findCenter = function (arr, left, right) {
        let flag = arr[left], // 标尺元素
            idx = left + 1; // 要交换的起始小下标

        // 将所有小于当前位置的元素放在紧跟 left 后边
        for (let i = idx; i <= right; i++) {
            if (arr[i] < flag) {
                swap(arr, idx, i);
                idx++;
            }
        }
        swap(arr, left, idx - 1);
        return idx;
    }

    let sort = function (arr, left, right) {
        if (left < right) {
            let center = findCenter(arr, left, right);

            sort(arr, left, center - 1);
            sort(arr, center, right);
        }

        return arr;
    }

    if (arr.length < 2) { return arr }

    return sort(arr, 0, arr.length - 1);
}

export default quickSort1;
// debugger
// console.log(quickSort1([6, 1, 9, 5, 3, 4]))

