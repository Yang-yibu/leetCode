/* eslint-disable */
import findKthLargest from "../../code/sort/lesson2";

test('findKthLargest: 1', () => {
    expect(findKthLargest([3, 2, 1, 5, 6, 4], 2)).toBe(5)
})
test('findKthLargest: 2', () => {
    expect(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4)
})
