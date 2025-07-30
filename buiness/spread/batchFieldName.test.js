import { batchFieldName, getField } from './batchFieldName';

// test('批量设置字段名称 getField', () => {
//   expect(getField('aa')).toEqual('aa');
//   expect(getField('aa', 1)).toEqual('aa1');

//   expect(getField('aa', '', 2)).toEqual('aa2', 'aa_2');
//   // expect(getField('aa_', '', 2)).toEqual('aa_2');

//   expect(getField('', 1, 2)).toEqual('1_2');
//   expect(getField('aa', 1, 2)).toEqual('aa1_2');
// });

describe('批量设置字段名 getField', () => {
  test('aa => aa', () => {
    expect(getField('aa')).toEqual('aa');
  });
  test('aa,1 => aa1', () => {
    expect(getField('aa', 1)).toEqual('aa1');
  });
  test('aa,,2 => aa2 OR aa_2', () => {
    // 或者
    // expect(getField('aa_', '', 2)).toEqual('aa_2');
    expect(getField('aa', '', 2)).toEqual('aa2', 'aa_2');
  });
  test(',1,2 => 1_2', () => {
    expect(getField('', 1, 2)).toEqual('1_2');
  });
  test('aa,1,2 => aa1_2', () => {
    expect(getField('aa', 1, 2)).toEqual('aa1_2');
  });
});

describe('批量设置字段名 batchFieldName', () => {
  test('aa => aa', () => {
    expect(batchFieldName('aa')).toEqual('aa');
  });
  test('aa,1 => aa1', () => {
    expect(batchFieldName('aa', 1)).toEqual('aa1');
  });
  test('aa,,2 => aa2 OR aa_2', () => {
    // 或者
    // expect(getField('aa_', '', 2)).toEqual('aa_2');
    expect(batchFieldName('aa', '', 2)).toEqual('aa2', 'aa_2');
  });
  test(',1,2 => 1_2', () => {
    expect(batchFieldName('', 1, 2)).toEqual('1_2');
  });
  test('aa,1,2 => aa1_2', () => {
    expect(batchFieldName('aa', 1, 2)).toEqual('aa1_2');
  });
});
