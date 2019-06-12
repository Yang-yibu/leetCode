
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

export default quickSort;
