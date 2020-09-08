import { formatNum } from '../../code/utils/number';

test('formatNum: 格式化数字', () => {
  expect(formatNum()).toBe('0.00');
  expect(formatNum(0.0)).toBe('0.00');

  let n3 = '01.10';
  expect(formatNum(n3)).toBe('1.10');
});
