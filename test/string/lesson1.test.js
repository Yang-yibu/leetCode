import reverseWords from '../../code/string/lesson1';

test('reverseWords：原字符串单个空格', () => {
  expect(reverseWords("Let's take LeetCode contest")).toBe("s'teL ekat edoCteeL tsetnoc");
})

test('reverseWords: 原字符串多个空格', () => {
  expect(reverseWords("Let's take  LeetCode contest")).toBe("s'teL ekat edoCteeL tsetnoc");
})