/** 字符串格式 `{{ 变量或变量路径 }}` */

import { execFnBodyStr } from '../utils/fn';

/**
 * 字符串格式 `{{ 变量或变量路径 }}`
 * `../../code/sql/parse.js`
 */
// eslint-disable-next-line camelcase
const regCondition_r = /\{\{\s*((?:(?!\{\{|\}\}).)*?)\s*\}\}/g;
/**
 * 字符串变量替换 `{{ ... }}`
 * @param {String} str
 * @returns {string} 参数名集合
 */
export function strVariableInject1(str = '', data = {}) {
  // `{{ sysName }} 另一个 {{ sys.name }}`.replace(/\{\{\s*((?:(?!\{\{|\}\}).)*?)\s\}\}/g, function (...a) {console.log(a)})
  return str.replace(regCondition_r, function (searchStr, varPath) {
    let val = execFnBodyStr(data, `return data.${varPath}`);
    if (val === undefined) val = searchStr;
    return val;
  });
}
