/* eslint-disable no-template-curly-in-string */

/**
 * @typedef IParam - 供解析 SQL 使用的参数
 * @property {string} id 参数标识符
 * @property {string} name 参数名 - 需要去除 两边空格
 * @property {string} defaultVal 默认值
 * - 多值使用 `,` 分割
 * @property {string} value 选中值
 * - 多值使用 `,` 分割
 * @property {'string'|'number'} type 参数类型
 * @property {boolean=} isMul 允许多值
 * - SQL 可以用 `=` 代替 `in` 操作符
 * - 使用 in 时，主动使用 () 包裹参数
 * @property {boolean=} isNull 允许为空
 * @property {number} order 排序
 * @property {object} row 参数原始信息
 */
/**
 * @typedef IPart
 * @property {string} sql 部分 SQL
 * @property {string} _sql 去除包裹器部分
 * @property {boolean} isCondition 模板条件部分
 * @property {string[]} params 使用的参数
 */

class SqlParse {
  /** 条件匹配器 */
  static regCondition = /\{\{((?!\{\{|\}\}).)*\}\}/g;
  /** 可替换去除包裹器 replace $1 */
  static regCondition_r = /\{\{((?:(?!\{\{|\}\}).)*)\}\}/g;
  /**
   * 把 SQL 根据 条件 分成几部分
   */
  static regCondition_s = /\B(\{\{(?:(?!\{\{|\}\}).)*\}\})\B/;
  /** 参数匹配器 */
  static regParameter = /\$\{((?!\$\{|\{|\}).)*\}/g;
  /** 可替换去除包裹器 replace $1 */
  static regParameter_r = /\$\{((?:(?!\$\{|\{|\}).)*)\}/g;
  /**
   * 把 SQL 根据 参数 分成几部分
   */
  static regParameter_s = /\B(\$\{(?:(?!\$\{|\}).)*\})\B/;

  /** SQL 字符串 */
  #sql = '';
  /**
   * SQL 按条件 `{{ 条件 }}` 分割为几部分
   * @type {IPart[]}
   */
  #sqlPart = [];
  /**
   * 参数配置列表
   * @type {IParam[]}
   */
  #paramsConfig = [];

  constructor(sql, params) {
    this.setSql(sql);
    this.setParams(params);
  }
  getSql() {
    return this.sql
  }
  setSql(sql = '') {
    /** @type {IPart[]} */
    let _sql;
    if (typeof sql === 'string') {
      _sql = [];
      sql.split(SqlParse.regCondition_s).
        map(i => {
        if (i.indexOf('{{') > -1 && i.indexOf('{{') > -1 ) {
          // 条件部分
          const part = { sql: i, _sql: i.replace(SqlParse.regCondition_r, '$1'), isCondition: true, params: [] }
          i.replace(SqlParse.regParameter_r, function (match, p1) {
            part.params.push(p1)
          })
          _sql.push(part)
        } else {
          /** @type {IPart} */
          const part = { sql: i, _sql: i.replace(SqlParse.regParameter_r, '$1'), isCondition: false, params: [] }
          i.replace(SqlParse.regParameter_r, function (match, p1) {
            part.params.push(p1)
          })
          _sql.push(part)
        }
      });

      this.#sql = sql
      this.#sqlPart = _sql
    } else {
      throw new Error('请输入 SQL 字符串')
    }
  }
  setParams(params) {
    this.#paramsConfig = params || []
  }

  /** 获取 SQL 中使用的参数 */
  getUsedParam() {
    let params = []
    this.#sqlPart.map(item => {
      item.params.map(p => {
        if (params.indexOf(p) === -1) {
          params.push(p)
        }
      })

      // let result = item.sql.match(SqlParse.regParameter)
      // if (result) {
      //   result.map(param => {
      //     let p = param.replace(SqlParse.regParameter_r, '$1')
      //     if (!params.indexOf(p) === -1) {
      //       params.push(p)
      //     }
      //   })
      // }
    })

    console.log('SQL 中使用的参数: ', params);
    return params;
  }

  /**
   * 根据 参数配置 生成 SQL
   */
  buildSql() {
    const paramsConfig = this.#paramsConfig;
    const sqlPart = this.#sqlPart;

    /** @type {{[prop: string]: IParam}} */
    const MapParam = {};
    paramsConfig.map(item => {
      MapParam[item.name] = item
    })

    const sql_parts = sqlPart.map(item => {
      let sql = item.sql
      if (item.isCondition) {
        // 最小条件里只有一个参数
        const paramConf = MapParam[item.params[0]]
        if (paramConf) {
          const val = paramConf.value || paramConf.defaultVal;
          if (!val && paramConf.isNull) {
            sql = '1=1'
          } else if (paramConf.isMul) {
            if (sql.indexOf('=') > -1) {
              val = val.split(',').map(i => "'" + i + "'").join(',')
              sql = sql.replace('=', 'in').replace(SqlParse.regParameter_r, '(' + val + ')')
            } else if (sql.indexOf('in') > -1) {
              val = val.split(',').map(i => "'" + i + "'").join(',')
              sql = sql.replace(SqlParse.regParameter_r, val)
            } else {
              sql = sql.replace(SqlParse.regCondition_r, "'$1'")
            }
          } else {
            sql = sql.replace(SqlParse.regParameter_r, "'$1'")
          }
        }
      } else {
        // 其他模块可能有多个参数，不做或者不需要做特殊处理
        item.sql.replace(SqlParse.regParameter_r, function (match, p1) {
          const paramConf = MapParam[p1]
          if (paramConf) {
            const val = paramConf.value || paramConf.defaultVal;
            if (!val && paramConf.isNull) {
              return val
            }
          }
          return sql.replace(SqlParse.regParameter_r, "'$1'")
        })
      }

      return sql
    })

    return { runSql: sql_parts.join(''), originSql: this.#sql }
  }

  /**
   * SQL 按 参数条件 切分为几部分
   * @param {String} sql sql 语句
   * @returns
   */
  static getSqlPartOfCondition(sql = '') {
    let result;
    result = sql.split( SqlParse.regCondition_s).filter(i => i);
    console.log('按条件分割 SQL：\n', JSON.stringify(result, null, '  '));
    return result;
  }
  /**
   * 获取包含自定义参数的条件表达式
   * @param {String} sqlStr sql 语句
   * @returns {string[]?} 参数名集合
   */
  static getConditionWithParameters(sqlStr = '') {
    let result;
    result = sqlStr.match(SqlParse.regCondition);
    if (result) {
      result = result.map(item => {
        return item.replace(SqlParse.regCondition_r, '$1')
      })
    }

    console.log('获取包含参数的条件：\n' ,result);
    return result;
  }
  /**
   * 获取所有参数
   * @param {String} sqlStr sql 语句
   * @returns {string[]?} 参数名集合
   */
  static getParameter(sqlStr = '') {
    let result;
    result = sqlStr.match(SqlParse.regParameter);
    if (result) {
      result = result.map(item => {
        return item.replace(SqlParse.regParameter_r, '$1')
      })
    }

    console.log('获取参数：\n', result);
    return result;
  }
}

/** SQL 模板 */
const sqlArr = {
  /** where 条件具有参数 */
  whereParams:
    'select * from 基础表_会计管理数据_会计科目表 where 1=1 \n and {{ 会计科目编码 = ${@会计科目编码} }} \n and {{ 会计年度 in ${@会计年度} }}',
  /** 查询字段 & where 有参数 */
  colWhereParams: 'select ${@会计年度}, 会计科目编码, 会计科目名称, 会计年度 from 基础表_会计管理数据_会计科目表 WHERE 1 = 1 and 会计科目编码 = 1001 and {{ 会计年度 = ${@会计年度} }} and {{会计 = 会计}}'
};

const wp = new SqlParse(sqlArr.whereParams)
wp.buildSql()
