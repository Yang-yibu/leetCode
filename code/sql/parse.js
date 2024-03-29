/* eslint-disable */

function logFn(group = '分组', ...log) {
  console.group(group + ': ');
  log.forEach((ele) => {
    console.log(ele);
  });
  console.groupEnd();
}

/** 条件匹配器 */
const regCondition = /\{\{((?!\{\{|\}\}).)*\}\}/g;
/** 可替换去除包裹器 replace $1 */
const regCondition_r = /\{\{\s*((?:(?!\{\{|\}\}).)*?)\s\}\}/g;
/**
 * 把 SQL 根据 条件 分成几部分
 */
// const regCondition_s = /\B(?=\{\{(?:(?!\{\{|\}\}).)*\}\})/;
const regCondition_s = /\B(\{\{(?:(?!\{\{|\}\}).)*\}\})\B/;

/** 参数匹配器 */
const regParameter = /\$\{((?!\$\{|\{|\}).)*\}/g;
/** 可替换去除包裹器 replace $1 */
const regParameter_r = /\$\{\s*((?:(?!\$\{|\{|\}).)*?)\s*\}/g;
const regParameter_s = /\B(\$\{(?:(?!\$\{|\}).)*\})\B/;

/**
 * SQL 按 参数条件 切分为几部分
 * @param {String} sql sql 语句
 * @returns
 */
function getSqlPartOfCondition(sql = '') {
  let result;
  result = sql.split(regCondition_s).filter((i) => i);

  logFn('按参数条件切分', sql, JSON.stringify(result, null, '  '));
  return result;
}
/**
 * SQL 按 参数 切分为几部分
 * @param {String} sql sql 语句
 * @returns
 */
function getSqlPartOfParam(sql = '') {
  let result;
  result = sql.split(regParameter_s).filter((i) => i);

  logFn('按参数分割', sql, JSON.stringify(result, null, '  '));
  return result;
}

/**
 * 获取包含自定义参数的条件表达式
 * @param {String} sqlStr sql 语句
 * @returns {string[]?} 参数名集合
 */
function getConditionWithParameters(sqlStr = '') {
  let result;
  result = sqlStr.match(regCondition);
  if (result) {
    result = result.map((item) => {
      return item.replace(regCondition_r, '$1');
    });
  }

  logFn('包含自定义参数的条件表达式', sqlStr, result);
  return result;
}

/**
 *
 * @param {String} sqlStr sql 语句
 * @returns {string[]?} 参数名集合
 */
function getParameter(sqlStr = '') {
  let result;
  result = sqlStr.match(regParameter);
  if (result) {
    result = result.map((item) => {
      return item.replace(regParameter_r, '$1');
    });
  }

  logFn('获取使用参数集合', sqlStr, result);
  return result;
}

/** SQL 模板 */
const sqlArr = {
  /** where 条件具有参数 */
  whereParams: `select * from 基础表_会计管理数据_会计科目表 where 1=1
    and {{ 会计科目编码 = \${@会计科目编码} }}
    and {{ 会计年度 in \${@会计年度} }}`,
  /** 查询字段 & where 有参数 */
  colWhereParams: `select
  \${@会计年度}, 会计科目编码, 会计科目名称, 会计年度
  from 基础表_会计管理数据_会计科目表 WHERE 1 = 1
  and 会计科目编码 = 1001
  and {{ 会计年度 = \${ @会计年度 } }}
  and {{会计 = 会计}}`,
};

getSqlPartOfCondition(sqlArr.whereParams);
getSqlPartOfParam(sqlArr.whereParams);
getConditionWithParameters(sqlArr.whereParams);
getParameter(sqlArr.whereParams);

getSqlPartOfCondition(sqlArr.colWhereParams);
getSqlPartOfParam(sqlArr.colWhereParams);
getConditionWithParameters(sqlArr.colWhereParams);
getParameter(sqlArr.colWhereParams);

// const s = sqlArr.colWhereParams.replace(regParameter_r, function (match, p1) {
//   console.log(match, p1);

//   return "'" + p1 + "'"
// })

function removeTag(sql = '', reg, log = '去除包裹器') {
  const s = sql.replace(reg, "'$1'");
  logFn(log, s);
}
removeTag(sqlArr.colWhereParams, regCondition_r, '去除条件包裹器')
removeTag(sqlArr.colWhereParams, regParameter_r, '去除参数包裹器')

// 'aaa'.replace(regParameter_r, function (match, p1) {
// console.log(match, p1);
// })
