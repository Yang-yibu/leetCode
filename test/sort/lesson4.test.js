import firstMissingPositive from "../../code/sort/lesson4";

let methodName = 'firstMissingPositive';

test(`${ methodName }: 1`, () => {
    expect(firstMissingPositive([1,2,0])).toBe(3)
})

test(`${ methodName }: 1`, () => {
    expect(firstMissingPositive( [3,4,-1,1] )).toBe(2)
})

test(`${ methodName }: 1`, () => {
    expect(firstMissingPositive( [7,8,9,11,12] )).toBe(1)
})
