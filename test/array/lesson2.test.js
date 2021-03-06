/* eslint-disable */
import cardGroup, { gcd } from '../../code/array/lesson2';

// test('gcd: ', () => {
//   expect(gcd(6, 9)).toBe(3);
//   expect(gcd(2, 8)).toBe(2);
//   expect(gcd(2, 3)).toBe(0);
// })

test('cardGroup: ', () => {
  expect(cardGroup([1, 2, 3, 4, 4, 3, 2, 1])).toBe(true);
  expect(cardGroup([1,1,1,2,2,2,3,3])).toBe(false);
  expect(cardGroup([1])).toBe(false);
  expect(cardGroup([1, 1])).toBe(true);
  expect(cardGroup([1,1,2,2,2,2])).toBe(true);
  expect(cardGroup([
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0,
    0, 0, 0,
    1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1,
    1, 1, 1,
    2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2,
    2, 2, 2,
    3, 3, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4,
    4, 4, 4,
    5, 5, 5,
    6, 6, 6,
    7, 7, 7,
    8, 8, 8, 8, 8, 8,
    9, 9, 9,
    10, 10, 10
  ])).toBe(true);
})
