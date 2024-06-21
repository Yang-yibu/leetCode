function strReplace1(str = '', varPool = {}) {
  // let s = str.replace(/\\":(\w+?)\\"/g, '$1$1');
  let s = str.replace(/":(\w+?)"/g, function (sub, $1) {
    return varPool[$1] ? `"${varPool[$1]}"` : sub;
  });

  // console.log(s);
  return s;
}

// 莫奈大屏变量替换
export function strReplace(str = '', varPool = {}) {
  let reg;
  // TODO: \x00-\xff 表示翻译
  // eslint-disable-next-line no-control-regex
  // reg = /:((?:[^\x00-\xff]|[a-zA-Z_$])(?:[^\x00-\xff]|[a-zA-Z0-9_$])*)/g;
  // 可以解析处理变量名
  // eslint-disable-next-line no-control-regex
  reg = /:?((?:[^\x00-\xff]|[a-zA-Z_$])(?:[^\x00-\xff]|[a-zA-Z0-9_$])*)/g;
  // reg = /":(\w+?)"/g;

  let s = str
    .replace(reg, function (sub, $1) {
      // return varPool[$1] ? `"${varPool[$1]}"` : sub;
      // return varPool[$1] ? `${varPool[$1]}` : sub;

      if (sub.indexOf(':') === -1) {
        return `"${sub}"`;
      }
      return varPool[$1] ? `${varPool[$1]}` : sub;
    })
    .replaceAll('""', '"');

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
