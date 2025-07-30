import { arrInsertAfter, arrInsertAfter2 } from './insertArr';

test('指定元素后插入内容', () => {
  expect(arrInsertAfter([1, 2, 3, 4], 11, 1)).toEqual([1, 2, 11, 3, 4]);
  expect(arrInsertAfter([1, 2, 3, 4], 11, 0)).toEqual([1, 11, 2, 3, 4]);
  expect(arrInsertAfter([1, 2, 3, 4], 11, 3)).toEqual([1, 2, 3, 4, 11]);
  expect(arrInsertAfter([1, 2, 3, 4], 11)).toEqual([1, 2, 3, 4]);

  expect(arrInsertAfter([1, 2, 3, 4], 11, 5)).toEqual([1, 2, 3, 4]);
});

test('指定元素后插入内容2，可以给首位末尾插入', () => {
  expect(arrInsertAfter2([1, 2, 3, 4], 11, 1)).toEqual([1, 2, 11, 3, 4]);
  expect(arrInsertAfter2([1, 2, 3, 4], 11, 0)).toEqual([1, 11, 2, 3, 4]);
  expect(arrInsertAfter2([1, 2, 3, 4], 11, 3)).toEqual([1, 2, 3, 4, 11]);
  expect(arrInsertAfter2([1, 2, 3, 4], 11)).toEqual([1, 2, 3, 4]);

  expect(arrInsertAfter2([1, 2, 3, 4], 11, 5)).toEqual([1, 2, 3, 4, 11]);
  expect(arrInsertAfter2([1, 2, 3, 4], 11, -1)).toEqual([11, 1, 2, 3, 4]);

  var a = [1, 2, 3, 4];
  expect(arrInsertAfter2(a, 11, 5)).toEqual([1, 2, 3, 4, 11]);
});
