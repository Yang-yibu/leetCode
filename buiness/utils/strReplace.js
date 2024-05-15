function strReplace1(str = '', varPool = {}) {
  // let s = str.replace(/\\":(\w+?)\\"/g, '$1$1');
  let s = str.replace(/":(\w+?)"/g, function (sub, $1) {
    return varPool[$1] ? `"${varPool[$1]}"` : sub;
  });

  // console.log(s);
  return s;
}

export function strReplace(str = '', varPool = {}) {
  let s = str.replace(/":(\w+?)"/g, function (sub, $1) {
    return varPool[$1] ? `"${varPool[$1]}"` : sub;
  });

  return s;
}
