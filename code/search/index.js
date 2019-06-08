
/**
 * 二分查找 | 折半查找
 * @param {*} find 查找的目标元素
 * @param {*} arr 数组
 * @param {*} low 查找起始点
 * @param {*} high 查找末尾点
 */
function binary(find, arr, low, high) {
    if (low <= high) {
        if (arr[low] == find) {
            return low;
        }
        if (arr[high] == find) {
            return high;
        }
        // 找中位
        var mid = Math.ceil((high + low) / 2);
        if (arr[mid] == find) {
            return mid;
        } else if (arr[mid] > find) {
            return binary(find, arr, low, mid - 1);
        } else {
            return binary(find, arr, mid + 1, high);
        }
    }
    return -1;
}

var Arr = [3, 5, 6, 7, 9, 12, 15];
console.log( binary(7, Arr, 0, Arr.length - 1) );
