
import sort from '../../code/sort/lesson1-1'

describe('冒泡排序：BubbleSort: ', () => {
    let arr1 = [1, 9, 5, 3, 4];
    test(JSON.stringify(arr1), () => {
        expect(sort(arr1)).toEqual([1, 3, 4, 5, 9])
    })

    let arr2 = [13, 19, 16, 1];
    test(JSON.stringify(arr2), () => {
        expect(sort(arr2)).toEqual([1, 13, 16, 19])
    })

    let arr3 = [1, 4, 5, 6, 7];
    test(JSON.stringify(arr3), () => {
        expect(sort(arr3)).toEqual([1, 4, 5, 6, 7])
    })
})
