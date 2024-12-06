/* eslint-disable jest/valid-expect */
import { strReplace, strReplaceJson } from './monaiVarPoolStrReplace';

test('执行字符串函数体', () => {
  expect(
    strReplace('{\n"kind": ":clType_gcfc",\n"level": ":clType2_yx",\n"orgCode": ":orgCode_yx"\n}', {
      clType_gcfc: '1',
      clType2_yx: '2',
    })
  ).toEqual('{\n"kind": "1",\n"level": "2",\n"orgCode": ":orgCode_yx"\n}');
});

describe('顺带解析为 JSON', () => {
  test('解析规范字符串', () => {
    expect(
      strReplaceJson(
        '{\n"kind": ":clType_gcfc",\n"level": ":clType2_yx",\n"orgCode": ":orgCode_yx"\n}',
        {
          clType_gcfc: '1',
          clType2_yx: '2',
        }
      )
    ).toEqual({ kind: '1', level: '2', orgCode: ':orgCode_yx' });
  });

  test('解析变量名缺少引号', () => {
    const res = strReplaceJson(
      '{\n"kind": :clType_gcfc,\n"level": ":clType2_yx",\n"orgCode": ":orgCode_yx"\n}',
      {
        clType_gcfc: '1',
        clType2_yx: '2',
      }
    );
    // expect(res).toEqual({ kind: '1', level: '2', orgCode: ':orgCode_yx' });
    expect([
      { kind: '1', level: '2', orgCode: ':orgCode_yx' },
      { kind: 1, level: '2', orgCode: ':orgCode_yx' },
      // { kind: 2, level: '2', orgCode: ':orgCode_yx' },
    ]).toContainEqual(res);
  });

  test('解析键名缺少引号', () => {
    expect(
      strReplaceJson(
        '{\nkind: ":clType_gcfc",\n"level": ":clType2_yx",\n"orgCode": ":orgCode_yx"\n}',
        {
          clType_gcfc: '1',
          clType2_yx: '2',
        }
      )
    ).toEqual({ kind: '1', level: '2', orgCode: ':orgCode_yx' });
  });

  test('解析混合引号', () => {
    expect(
      strReplaceJson(`{					"kind":'"zyfl"',				"carTypeName":':clType2_yx'}`, {
        // strReplaceJson(`{					"kind":"zyfl",				"carTypeName":':clType2_yx'}`, {
        clType_gcfc: '1',
        clType2_yx: '2',
      })
    ).toEqual({ kind: 'zyfl', carTypeName: '2' });
  });
  test('解析没有默认值', () => {
    expect(
      strReplaceJson(`{					"kind":'zyfl',				"carTypeName":':clType2_yx'}`, {
        clType_gcfc: '1',
        clType2_yx: '',
      })
    ).toEqual({ kind: 'zyfl', carTypeName: '' });
  });
  test('解析没有默认值-undefined', () => {
    expect(
      strReplaceJson(`{					"kind":'zyfl',				"carTypeName":':clType2_yx'}`, {
        clType_gcfc: '1',
        // clType2_yx: '',
      })
    ).toEqual({ kind: 'zyfl', carTypeName: ':clType2_yx' });
  });

  test('解析最后一个属性有逗号', () => {
    expect(
      // eslint-disable-next-line no-multi-str
      strReplaceJson('{\
"dataSource":":dSource",\
}', {
        dSource: '1',
        // clType2_yx: '',
      })
    ).toEqual({ dataSource: '1' });
  });
});
