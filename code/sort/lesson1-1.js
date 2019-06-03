
// 冒泡排序
export default (arr) => {

    // 控制循环次数
    for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
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
