import { execFnBodyStr, extraFnBody, getValByPath } from './fn';

test('执行字符串函数体', () => {
  expect(execFnBodyStr({ a: 1, b: 2 }, 'return data.a + data.b')).toEqual(3);
  expect(execFnBodyStr({ a: 1, b: 2 })).toEqual({ b: 2, a: 1 });
  expect(execFnBodyStr()).toEqual(undefined);
});

test('提取函数体为字符串', () => {
  expect(
    extraFnBody(function (a, b) {
      return a + b;
    })
  ).toEqual(`function (a, b) {
    return a + b;
  }`);
});

test('根据属性路径获取值', () => {
  expect(getValByPath({ a: [{ b: 1 }] }, 'a[0].b')).toEqual(1);
  expect(getValByPath([{ b: 1 }, { b: 2 }], '[0].b')).toEqual(1);
});

var resData = {
  tableError: [],
  data: {
    Y23FX01: {
      scp1: {
        SQL2: [
          {
            ORG_TYPE_GROUP: '合计',
            人员编制数: null,
          },
        ],
        SQL1: [
          {
            ORG_TYPE_GROUP: '合计',
            单位数: 0,
            车辆编制数_合计: null,
            车辆编制数_机要通信车: null,
            车辆编制数_应急保障用车: null,
            车辆编制数_执法执勤用车: null,
            车辆编制数_特种专业技术用车: null,
            车辆编制数_业务用车: null,
            车辆编制数_其他公务用车: null,
            车辆编制数_除执法执勤_特种专业技术用车外: null,
          },
        ],
      },
      scp2: {
        FX01G3_2: 0,
        FX01G3_3: null,
        FX01G3_6: null,
        FX01G3_7: null,
        FX01G3_4: null,
        FX01G3_12: 0,
        FX01G3_5: null,
        FX01G3_11: null,
        FX01G3_10: null,
        FX01G3_8: null,
        FX01G3_9: null,
      },
    },
  },
};

/**
 *
 * @param {typeof resData} data
 */
function d(data) {
  var d = data.data;
  var n = {};
  Object.keys(d).map((k) => {
    n[k] = Object.assign(d[k].scp2, { FX01G3_1: 100 });
  });
  n.FX01 = { dws1_1: '合计', dws2_1: 0, dws3_1: '0', dws4_1: 100 };
  return n;
}

