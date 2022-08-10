/** 移除空白字符 */
export function removeWhiteSpace(sql = '') {
  if (!sql) return '';
  if (typeof sql !== 'string') return;
  return sql
    .split(/\s+/)
    .filter((i) => i)
    .join(' ');
}

/** SQL 模板 */
export const sqlArr = {
  /** 查询字段、条件 具有参数 */
  whereParams: {
    sql: `select \${@会计年度}, @会科年, \${@会科年}, 会计科目编码, 会计科目名称 from 基础表_会计管理数据_会计科目表 where 1=1 \n
    and {{ 会计科目编码 = \${@会计科目编码} }}
    and {{ 会计年度 = \${@会计年度} }}
    and {{ 会计年度 in \${@会计年度} }}`,
    params: ['@会计年度', '@会科年', '@会计科目编码'],
  },
  colWhereParams: {
    sql: `select \${@会计年度}, @会科年, \${@会科年}, 会计科目编码, 会计科目名称, 会计年度 from 基础表_会计管理数据_会计科目表 WHERE 1 = 1 and 会计科目编码 = 1001 and {{ 会计年度 = \${@会计年度} }} and {{会计 = 会计}}`,
    params: ['@会计年度', '@会科年'],
  },
};

/**
 * 获取参数配置
 * @param {'有默认值'|'有值'|'无值'} param 不包含 @ 的参数名集合
 * @param {boolean} isMul 多值
 * @param {boolean} isNull 允许为空
 * @return {import('./parseClass').IParam[]}
 */
export function getParams(param, isMul = false, isNull = false) {
  const params = {
    // 亦可模拟普通的单值
    有默认值: {
      name: '@会计年度',
      type: 'string',
      defaultVal: '默认值',
      value: '',
      isMul: isMul,
      isNull: isNull,
    },
    有值: {
      name: '@会计年度',
      type: 'string',
      defaultVal: '',
      value: '1,2,3',
      isMul: isMul,
      isNull: isNull,
    },
    无值: {
      name: '@会计年度',
      type: 'string',
      defaultVal: '',
      value: '',
      isMul: isMul,
      isNull: isNull,
    },
  };
  return [{ ...params[param] }];
}
