/** 对象转 FormData */
export function JsonFormData(source = {}) {
  // eslint-disable-next-line no-undef
  const data = new FormData();
  const d = {};
  Object.keys(source).map((key) => {
    const v = source[key];
    const vt = typeof v;
    if (vt === 'object' && v !== null) {
      data.append(key, v);
      d[key] = v;
    } else if (['string', 'number', 'bigint', 'boolean', 'undefined'].indexOf(vt) > -1) {
      data.append(key, v);
      d[key] = v;
    } else {
      console.log('其它类型：', key, v, vt);
    }
  });

  // console.log(d);
  return data;
}

/** 解析 JSON 字符串 */
export function jsonStrParse(str) {
  try {
    // '1' => 1
    // 'null' => null
    var o = JSON.parse(str);
    if (o && typeof o === 'object') {
      return o;
    }
  } catch (e) {
    // .
  }
  return undefined;
}
