import selectionSort from '../../code/sort/lesson1-2';


test('选择排序: Selection Sort', () => {
    expect(selectionSort([1, 9, 5, 3, 4])).toEqual([1, 3, 4, 5, 9])
})
