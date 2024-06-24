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
export function strReplace(str = '', varPool = {}) {
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

export function strReplaceJson(str = '', varPool = {}) {
  var s = strReplace(str, varPool);
  try {
    s = JSON.parse(s);
  } catch (e) {
    console.log('解析错误：', s);
    console.log(e.message);
  }
  return s;
}
