
// 给定一个未排序的数组，找出其中没有出现的最小的正整数

/**
 * 缺失最小正整数
 * @param {number[]} arr
 */
let firstMissingPositive = function (arr) {
    // 只要正整数；过滤掉非正整数
    arr = arr.filter(val => val > 0);
    // 升序：目的方便从左到右取最小值
    arr = arr.sort((a, b) => a - b);

    let len = arr.length;
    // 正整数数组不为空
    if (len) {
        // 如果第一个不为 1，返回 1
        if (arr[0] !== 1) return 1;

        // 从左边开始遍历，只要当前元素和上一个的差值 > 1，则当前位应该是缺失位
        for (let i = 1; i < len; i++) {
            if ((arr[i] - arr[i - 1]) > 1) {
                // 数组不连续
                return arr[i - 1] + 1;
            }
        }

        // 数组中没有缺失的
        // return arr[len - 1] + 1
        return arr.pop() + 1;
    } else {
        return 1;
    }
}

/**
 * 选择排序：缺失的第一个正整数
 * @param {number[]} arr
 */
let firstMissingPositive1 = function (arr) {
    arr = arr.filter(val => val > 0);

    let len = arr.length;
    if (len > 0) {

        for (let i = 0; i < len; i++) {
            let curMinIdx = i;
            for (let j = i + 1; j < len; j++) {
                if (arr[curMinIdx] > arr[j]) {
                    // 选择未排序中最大的
                    curMinIdx = j;
                }
            }

            if (curMinIdx !== i) {
                let tmp = arr[i];
                arr[i] = arr[curMinIdx];
                arr[curMinIdx] = tmp;
            }

            if (i > 0) {
                if (arr[i] - arr[i - 1] > 1) {
                    return arr[i - 1] + 1;
                }
            } else {
                // i === 0 的时候
                if (arr[0] !== 1) return 1;
            }
        }

        return arr.pop() + 1;

    } else {
        return 1;
    }
}

export default firstMissingPositive1;

// debugger
// console.log(firstMissingPositive([1, 2, 0]));
