/* eslint-disable no-control-regex */
function strReplace1(str = '', varPool = {}) {
  // let s = str.replace(/\\":(\w+?)\\"/g, '$1$1');
  let s = str.replace(/":(\w+?)"/g, function (sub, $1) {
    return varPool[$1] ? `"${varPool[$1]}"` : sub;
  });

  // console.log(s);
  return s;
}

// TODO: \x00-\xff 表示翻译
// reg = /:((?:[^\x00-\xff]|[a-zA-Z_$])(?:[^\x00-\xff]|[a-zA-Z0-9_$])*)/g;
// 可以解析处理变量名
// reg = /":(\w+?)"/g;

// return varPool[$1] ? `"${varPool[$1]}"` : sub;
// return varPool[$1] ? `${varPool[$1]}` : sub;

// 莫奈大屏变量替换
export function strReplace2(str = '', varPool = {}) {
  let reg;
  reg = /:?((?:[^\x00-\xff]|[a-zA-Z_$])(?:[^\x00-\xff]|[a-zA-Z0-9_$])*)/g;

  let s = str.replace(reg, function (sub, $1) {
    if (sub.indexOf(':') === -1) {
      return `"${sub}"`;
    }
    if ($1 in varPool && !varPool[$1]) {
      if (varPool[$1] === '') {
        return '@str';
      }

      return '@undef';
    }
    return varPool[$1] ? `${varPool[$1]}` : sub;
  });
  s = s.replaceAll("'", '"').replace(/"+/g, '"');
  s = s.replaceAll('@undef', undefined);
  s = s.replaceAll('@str', '');

  return s;
}

export function strReplace3(str = '', varPool = {}) {
  let reg;
  // reg = /"?:?((?:[^\x00-\xff]|[a-zA-Z_$])(?:[^\x00-\xff]|[a-zA-Z0-9_$])*)"?/g;
  reg = /"?:?((?:[^\x00-\xff]|[a-zA-Z_$])(?:[^\x00-\xff]|[a-zA-Z0-9_$])*:?)"?/g;

  str = str.replaceAll(/"|'/g, '');
  let s = str.replace(reg, function (sub, $1) {
    if (!sub.startsWith(':')) {
      // 字段
      return `"${$1}":`;
    }
    // var v = varPool[$1] ? `${varPool[$1]}` : sub;
    var v = sub;
    if ($1 in varPool) {
      v = varPool[$1];
    } else {
      v = `"${sub}"`;
    }
    return v;
  });

  return s;
}

export function strReplace4(str = '', varPool = {}) {
  let reg = /:?((?:[^\x00-\xff]|[a-zA-Z_$])(?:[^\x00-\xff]|[a-zA-Z0-9_$])*)/g;
  str = str
    .replace(reg, function (sub, $1) {
      if (sub.indexOf(':') === -1) {
        return `"${sub}"`;
      }
      return varPool[$1] ? `${varPool[$1]}` : sub;
    })
    .replaceAll("'", '"')
    .replaceAll('""', '"');

  return str;
}

// 另个结果都是 '{"dataSource":"1"}
// '{"dataSource":"1"}'.replace('1', '1')
// '{"dataSource":"1"}'.replace('1', 1)
// 大部分测试都通过了
export function strReplace5(str = '', varPool = {}) {
  Object.keys(varPool).map((k) => {
    str = str.replace(':' + k, varPool[k]);
  });
  str = str.replaceAll("'", '"');
  // str = str.replace(/\n|\t/g, '');

  return str;
}

export const strReplace = strReplace2;

export function strReplaceJson(str = '', varPool = {}) {
  var s = strReplace(str, varPool);
  try {
    // 最后一个字段有逗号
    s = s.replace(/\n|\t/g, '').replace(',}', '}');
    s = JSON.parse(s);
  } catch (e) {
    console.log('解析错误：', s);
    console.log(e.message);
  }
  return s;
}
