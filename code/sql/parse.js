/* eslint-disable no-template-curly-in-string */

// 条件匹配器
const regCondition = /{{((?!{{|}}).)*}}/g;
// 可替换去除包裹器 replace $1
const regCondition_r = /{{((?:(?!{{|}}).)*)}}/g;
// 把 SQL 根据 参数 分成几部分
const regCondition_s = /({{((?:(?!{{|}}).)*)}})\B/;

// 参数匹配器
const regParameter = /\${((?!${|{|}).)*}/g;
// 可替换去除包裹器 replace $1
const regParameter_r = /\${((?:(?!${|{|}).)*)}/g;

function getParameter(sqlStr = '') {
  let result;
  result = sqlStr.matchAll(/{[(.*)]}/);

  console.log(result);
  return result;
}

/** SQL 模板 */
const sqlArr = {
  // where 条件具有参数
  whereParams:
    'select * from 基础表_会计管理数据_会计科目表 where 1=1 \n and {{ 会计科目编码 = ${@会计科目编码} }} \n and {{ 会计年度 in ${@会计年度} }}',
};

getParameter(sqlArr[0]);
