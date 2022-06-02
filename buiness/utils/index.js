
/** 对象转 FormData */
export function JsonFormData(source = {}) {
  const data = new FormData();
  const d = {}
	Object.keys(source).map(key => {
		const v = source[key];
		const vt = typeof v;
		if (vt === 'object' && v !== null) {
			data.append(key, v);
			d[key] = v
		} else if (['string', 'number', 'bigint', 'boolean', 'undefined'].indexOf(vt) > -1) {
      data.append(key, v);
			d[key] = v
		} else {
			console.log('其它类型：', key, v, vt);
		}
  });

  // console.log(d);
  return data
}
