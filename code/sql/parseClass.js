/* eslint-disable camelcase */
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
 * - 使用 in 时，主动使用 `()` 包裹参数
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

/**
 * SQL 参数解析
 * - `{{  }}`
 * - - 处理 SQL 条件表达式
 * - `${ }`
 * - - 参数值替换，目前只做值替换
 */
class SqlParse {
  /** 条件匹配器 */
  static regCondition = /\{\{((?!\{\{|\}\}).)*\}\}/g;
  /** 可替换去除包裹器 replace $1 */
  static regCondition_r = /\{\{\s*((?:(?!\{\{|\}\}).)*?)\s*\}\}/g;
  /**
   * 把 SQL 根据 条件 分成几部分
   */
  static regCondition_s = /\B(\{\{(?:(?!\{\{|\}\}).)*\}\})\B/;
  /** 参数匹配器 */
  static regParameter = /\$\{((?!\$\{|\{|\}).)*\}/g;
  /** 可替换去除包裹器 replace $1 */
  static regParameter_r = /\$\{\s*((?:(?!\$\{|\{|\}).)*?)\s*\}/g;
  /**
   * 把 SQL 根据 参数 分成几部分
   */
  static regParameter_s = /\B(\$\{(?:(?!\$\{|\}).)*\})\B/;

  /** SQL 字符串 */
  private_sql = '';
  /**
   * SQL 按条件 `{{ 条件 }}` 分割为几部分
   * @type {IPart[]}
   */
  private_sqlPart = [];
  /**
   * 参数配置列表
   * @type {IParam[]}
   */
  private_paramsConfig = [];

  constructor(sql, params) {
    this.setSql(sql);
    this.setParams(params);
  }
  getSql() {
    return this.sql;
  }
  setSql(sql = '') {
    /** @type {IPart[]} */
    let _sql;
    if (typeof sql === 'string') {
      _sql = [];
      sql.split(SqlParse.regCondition_s).map((i) => {
        if (!i) return;

        if (i.indexOf('{{') > -1 && i.indexOf('{{') > -1) {
          // 条件部分
          const part = {
            sql: i,
            _sql: i.replace(SqlParse.regCondition_r, '$1'),
            isCondition: true,
            params: [],
          };
          i.replace(SqlParse.regParameter_r, function (match, p1) {
            part.params.push(p1);
          });
          _sql.push(part);
        } else {
          /** @type {IPart} */
          const part = {
            sql: i,
            _sql: i.replace(SqlParse.regParameter_r, '$1'),
            isCondition: false,
            params: [],
          };
          i.replace(SqlParse.regParameter_r, function (match, p1) {
            part.params.push(p1);
          });
          _sql.push(part);
        }
      });

      this.private_sql = sql;
      this.private_sqlPart = _sql;
    } else {
      throw new Error('请输入 SQL 字符串');
    }
  }
  /**
   *
   */
  setParams(params = []) {
    this.private_paramsConfig = params || [];
  }

  /** 获取 SQL 中使用的参数 */
  getUsedParam() {
    let params = [];
    this.private_sqlPart.map((item) => {
      item.params.map((p) => {
        if (params.indexOf(p) === -1) {
          params.push(p);
        }
      });

      // let result = item.sql.match(SqlParse.regParameter)
      // if (result) {
      //   result.map(param => {
      //     let p = param.replace(SqlParse.regParameter_r, '$1')
      //     if (!params.indexOf(p) === -1) {
      //       params.push(p)
      //     }
      //   })
      // }
    });

    console.log('SQL 中使用的参数: ', params);
    return params;
  }

  /**
   * 根据 参数配置 生成 SQL
   */
  buildSql() {
    const paramsConfig = this.private_paramsConfig;
    const sqlPart = this.private_sqlPart;
    /** 给值拼接单引号 */
    const isQuote = true;

    /** @type {{[prop: string]: IParam}} */
    const MapParam = {};
    paramsConfig.map((item) => {
      MapParam[item.name] = item;
    });

    const sql_parts = sqlPart.map((item) => {
      let sql = item.sql;
      if (item.isCondition) {
        // 最小条件里只有一个参数
        const paramConf = MapParam[item.params[0]];
        sql = item._sql;

        if (paramConf) {
          let val = paramConf.value || paramConf.defaultVal;
          if (!val && paramConf.isNull) {
            sql = '1=1';
          } else if (paramConf.isMul) {
            if (sql.indexOf('=') > -1) {
              // 有等号 自动处理为 in 形式
              if (isQuote) {
                val = val
                  .split(',')
                  .map((i) => "'" + i + "'")
                  .join(',');
              }

              sql = sql.replace('=', 'in').replace(SqlParse.regParameter_r, '(' + val + ')');
            } else if (sql.indexOf('in') > -1) {
              // 已经是 in 形式
              if (isQuote) {
                val = val
                  .split(',')
                  .map((i) => "'" + i + "'")
                  .join(',');
              }

              sql = sql.replace(SqlParse.regParameter_r, val);
            } else {
              // 目前看其他不应当出现的 条件 是不合理的
              val = isQuote ? "'$1'" : '$1';

              sql = sql.replace(SqlParse.regCondition_r, val);
            }
          } else {
            // 合法 单值
            sql = sql.replace(SqlParse.regParameter_r, function (match, p1) {
              return isQuote ? "'" + val + "'" : val;
            });
          }
        } else {
          // 使用的不合法参数 - 或者匹配有问题
          sql = item._sql.replace(SqlParse.regParameter_r, function (match, p1) {
            return isQuote ? "'" + p1 + "'" : p1;
          });
        }
      } else {
        // 其他模块可能有多个参数，不做或者不需要做特殊处理

        sql = sql.replace(SqlParse.regParameter_r, function (match, p1) {
          const paramConf = MapParam[p1];
          if (paramConf) {
            let val = paramConf.value || paramConf.defaultVal;
            if (!val && paramConf.isNull) {
              if (isQuote) {
                val = "'" + val + "'";
              }
            } else if (paramConf.isMul) {
              if (isQuote) {
                val = val
                  .split(',')
                  .map((i) => "'" + i + "'")
                  .join(',');
              }
            } else {
              if (isQuote) {
                val = "'" + val + "'";
              }
            }
            return val;
          } else {
            return isQuote ? "'" + p1 + "'" : p1;
          }
        });
      }

      return sql;
    });

    return { runSql: sql_parts.join(''), originSql: this.private_sql };
  }
}

export default SqlParse;
