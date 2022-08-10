import { getParams, removeWhiteSpace, sqlArr } from './dataTest';
import SqlParse from './parseClass';

describe('where 条件中多个参数', () => {
  const sqlConf = sqlArr.whereParams;
  const sp = new SqlParse(sqlConf.sql);

  test('Test GetUsedParams is right', () => {
    expect(sp.getUsedParam()).toEqual(sqlConf.params);
  });
  test('Test BuildSql not use param is right', () => {
    const bs = sp.buildSql();
    expect(removeWhiteSpace(bs.runSql)).toBe(
      removeWhiteSpace(`
    select '@会计年度', @会科年, '@会科年', 会计科目编码, 会计科目名称 from 基础表_会计管理数据_会计科目表 where 1=1 \n
      and 会计科目编码 = '@会计科目编码'
      and 会计年度 = '@会计年度'
      and 会计年度 in '@会计年度'
    `)
    );
  });

  console.log('无值 ******************************');
  test('Test BuildSql param is right: noVal isMul isNull', () => {
    sp.setParams(getParams('无值', true, true));
    const bs = sp.buildSql();
    const runSql = removeWhiteSpace(bs.runSql);
    expect(runSql).toBe(
      removeWhiteSpace(`
    select '', @会科年, '@会科年', 会计科目编码, 会计科目名称 from 基础表_会计管理数据_会计科目表 where 1=1 \n
      and 会计科目编码 = '@会计科目编码'
      and 1 = 1
      and 1 = 1
    `)
    );
  });

  console.log('默认值-单值 ******************************');
  test('Test BuildSql param is right: 有默认值 isMul isNull', () => {
    sp.setParams(getParams('有默认值', true, true));
    const bs = sp.buildSql();
    const runSql = removeWhiteSpace(bs.runSql);
    expect(runSql).toBe(
      removeWhiteSpace(`
    select '默认值', @会科年, '@会科年', 会计科目编码, 会计科目名称 from 基础表_会计管理数据_会计科目表 where 1=1 \n
      and 会计科目编码 = '@会计科目编码'
      and 会计年度 in ('默认值')
      and 会计年度 in '默认值'
    `)
    );
  });
  test('Test BuildSql param is right: 有默认值 noMul isNull', () => {
    sp.setParams(getParams('有默认值', false, true));
    const bs = sp.buildSql();
    const runSql = removeWhiteSpace(bs.runSql);
    expect(runSql).toBe(
      removeWhiteSpace(`
    select '默认值', @会科年, '@会科年', 会计科目编码, 会计科目名称 from 基础表_会计管理数据_会计科目表 where 1=1 \n
      and 会计科目编码 = '@会计科目编码'
      and 会计年度 = '默认值'
      and 会计年度 in '默认值'
    `)
    );
  });

  console.log('值-多值 ******************************');
  test('Test BuildSql param is right: 本身多值 isMul isNull', () => {
    sp.setParams(getParams('有值', true, true));
    const bs = sp.buildSql();
    const runSql = removeWhiteSpace(bs.runSql);
    expect(runSql).toBe(
      removeWhiteSpace(`
    select '1,2,3', @会科年, '@会科年', 会计科目编码, 会计科目名称 from 基础表_会计管理数据_会计科目表 where 1=1 \n
    and 会计科目编码 = '@会计科目编码'
    and 会计年度 in ('1', '2', '3')
    and 会计年度 in ''1', '2', '3''
    `)
    );
  });
  test('Test BuildSql param is right: 本身多值 noMul isNull', () => {
    sp.setParams(getParams('有值', false, true));
    const bs = sp.buildSql();
    const runSql = removeWhiteSpace(bs.runSql);
    expect(runSql).toBe(
      removeWhiteSpace(`
    select '1,2,3', @会科年, '@会科年', 会计科目编码, 会计科目名称 from 基础表_会计管理数据_会计科目表 where 1=1 \n
    and 会计科目编码 = '@会计科目编码'
    and 会计年度 = '1,2,3'
    and 会计年度 in '1,2,3'
    `)
    );
  });
});
