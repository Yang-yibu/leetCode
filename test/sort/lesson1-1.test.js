
import sort from '../../code/sort/lesson1-1'

describe('冒泡排序：BubbleSort: ', () => {
    let arr1 = [1, 9, 5, 3, 4];
    test(JSON.stringify(arr1), () => {
        expect(sort(arr1)).toEqual([1, 3, 4, 5, 9])
    })
})
