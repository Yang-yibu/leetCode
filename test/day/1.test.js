import searchMatrix from '../../code/day/1'

test('searchMatrix: ', () => {
  expect(searchMatrix([ [1, 2, 3], [4, 5, 6], [7, 8, 9] ], 51)).toEqual(false)
  expect(searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 50]], 3)).toEqual(true)
  expect(searchMatrix([[1]], 1)).toEqual(true)
})
