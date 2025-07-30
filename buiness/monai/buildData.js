import { isEmpty, isPlainObject, isArrayLikeObject } from 'lodash';

/**
 * 支持多层嵌套选择
 * @param {Array} fields [{name1, mapper1}, {name2, mapper2}]
 * @param {Array} data [{mapper1, mapper2, ...}]
 * @return {Array} [{name1, name2}]
 */
export function buildData(fields, data) {
  if (isEmpty(data) || isEmpty(fields)) return data || [];

  // 递归得到每个映射数据，根据 Object 或 Array 类型返回不同的值
  const recursiveMapping = (nextData, list, start, tag) => {
    if (isEmpty(list[start]) || isEmpty(nextData)) return [];
    const end = list.length - 1;
    if (start === end && isPlainObject(nextData)) {
      const target = nextData[list[start]];
      if (tag) return target;
      return target || target === 0 ? [target] : [];
    }
    if (start === end && isArrayLikeObject(nextData)) {
      return nextData
        .filter((item) => isPlainObject(item) && list[start] in item)
        .map((item) => item[list[start]]);
    }
    if (start < end && isPlainObject(nextData) && list[start] in nextData) {
      return recursiveMapping(nextData[list[start]], list, start + 1);
    }
    if (start < end && isArrayLikeObject(nextData) && !isEmpty(nextData)) {
      return nextData
        .filter((item) => isPlainObject(item) && list[start] in item)
        .map((item) => recursiveMapping(item[list[start]], list, start + 1, true));
    }
    return [];
  };

  let match = 99999;
  let optionalMapper = true; // 处理过滤条件都为optional的情况
  let optionalMatch = 0;

  const temp = fields.reduce((pre, { name, mapper, optional }) => {
    const list = recursiveMapping(data, mapper.split('.'), 0);

    if (!optional) {
      match = Math.min(list.length, match);
      optionalMapper = false;
    } else optionalMatch = Math.max(list.length, optionalMatch);

    return {
      ...pre,
      [name]: list,
    };
  }, {});

  if (optionalMapper) match = Math.min(match, optionalMatch);

  return new Array(match).fill({}).map((obj, idx) =>
    fields.reduce(
      (pre, { name }) => ({
        ...pre,
        [name]: temp[name][idx],
      }),
      {}
    )
  );
}
