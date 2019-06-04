import maxGap from "../../code/sort/lesson3";

test('maxGap: 1', () => {
    expect(maxGap([3,6,9,1])).toBe(3)
})
test('maxGap: 2', () => {
    expect(maxGap([10])).toBe(0)
})

test('maxGap: 3', () => {
    expect(maxGap([13, 16, 19, 1])).toBe(12)
})
