import isMatch from "../../code/regexp/lesson2";

test('isMatch: aa, a', () => {
    expect(isMatch('aa', 'a')).toBe(false)
});

test('isMatch: aa, a*', () => {
    expect(isMatch('aa', 'a*')).toBe(true)
});

test('isMatch: ab, .*', () => {
    expect(isMatch('ab', '.*')).toBe(true)
});

test('isMatch: aab, c*a*b', () => {
    expect(isMatch('aab', 'c*a*b')).toBe(true)
});

test('isMatch: mississippi, mis*is*p*.', () => {
    expect(isMatch('mississippi', 'mis*is*p*.')).toBe(false)
});

test('isMatch: ab, .*c', () => {
    expect(isMatch('ab', '.*c')).toBe(false)
});

