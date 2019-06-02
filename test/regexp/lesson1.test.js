import repeatSubString from "../../code/regexp/lesson1";

test('repeatSubstring: abcabc', () => {
    expect(repeatSubString('abcabc')).toBe(true)
});

test('repeatSubstring: ababba', () => {
    expect(repeatSubString('ababba')).toBe(false)
});

test('repeatSubstring: abc', () => {
    expect(repeatSubString('abc')).toBe(false)
});
