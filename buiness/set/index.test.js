import { arrEleEquals } from './index';

test('arrEleEquals: 12,34,56', () => {
  expect(arrEleEquals('12,34,56')).toBe(false);
  expect(arrEleEquals('12,34,56', '34')).toBe(false);
  expect(arrEleEquals('12,34,56', '34,56,12')).toBe(true);
  expect(arrEleEquals('12,34,56', '34,56,12,33')).toBe(false);
});
