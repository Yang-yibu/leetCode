/* eslint-disable */
import flowers from '../../code/array/lesson3';

test('flowers: [1, 0, 0, 0, 1], 1', () => {
    expect(flowers([1, 0, 0, 0, 1], 1)).toBe(true);
})

test('flowers: [1,0,0,0,1], 2', () => {
    expect(flowers([1,0,0,0,1], 2)).toBe(false);
})

test('flowers: [0], 1', () => {
    expect(flowers([0], 1)).toBe(true);
})

