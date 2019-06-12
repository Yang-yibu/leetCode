import sort from '../../code/sort/lesson1-3';


test('快速排序: Quick Sort', () => {
    expect(sort([1, 9, 5, 3, 4])).toEqual([1, 3, 4, 5, 9])
    expect(sort([1, 2, 0])).toEqual([0, 1, 2])
    expect(sort([5, 3, 7, 4, 1, 9, 8, 6, 2])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9])
})
