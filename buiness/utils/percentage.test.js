import { getPercentWithPrecision } from './percentage5';

function fn(data = [], precision = 1, totalField, numField, ratioField) {
  const list = data.map((v) => v[numField] * 1);
  const d = data.map((v, i) => {
    const r = getPercentWithPrecision(list, i, precision);
    v.r = r;
    return v;
  });

  ratioField &&
    console.log(
      '优化前：',
      JSON.stringify(data.map((v) => Number.parseFloat(v[ratioField]))),
      data.reduce((total, acc) => total + Number.parseFloat(acc[ratioField]), 0)
    );
  console.log('优化后：', JSON.stringify(data.map((v) => v.r)));

  test('原数据和=total', () => {
    expect(data[0][totalField] * 1).toEqual(
      list.reduce((total, acc) => total + acc),
      0
    );
  });
  test('百分比和=100', () => {
    expect(d.reduce((total, acc) => total + acc.r, 0)).toEqual(100);
  });
}
describe('数据组1', () => {
  const data = [
    { total: '6300', x: '华北', y: '1052', ratio: '16.70' },
    { total: '6300', x: '华东', y: '1003', ratio: '15.92' },
    { total: '6300', x: '西南', y: '1366', ratio: '21.68' },
    { total: '6300', x: '西北', y: '1020', ratio: '16.19' },
    { total: '6300', x: '华中', y: '629', ratio: '9.98' },
    { total: '6300', x: '华南', y: '689', ratio: '10.94' },
    { total: '6300', x: '东北', y: '541', ratio: '8.59' },
  ];

  fn(data, 1, 'total', 'y', 'ratio');
});

describe('数据组2', () => {
  const data = [
    { ratioUnit: '23.93%', s: 1, num: '158181', x: '轿车', ratio: '37848' },
    { ratioUnit: '11.90%', s: 2, num: '158181', x: '越野车', ratio: '18823' },
    { ratioUnit: '9.98%', s: 3, num: '158181', x: '其他小型客车', ratio: '15789' },
    { ratioUnit: '2.91%', s: 4, num: '158181', x: '中型客车', ratio: '4607' },
    { ratioUnit: '2.93%', s: 5, num: '158181', x: '大型客车', ratio: '4642' },
    { ratioUnit: '48.34%', s: 6, num: '158181', x: '其他车型', ratio: '76472' },
  ];

  fn(data, 1, 'num', 'ratio', 'ratioUnit');
});
