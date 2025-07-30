import { jdDict1 } from './dic';

export function filterListOrTree(
  dataSource,
  keywords,
  filterFunc,
  filterLeaf // 是否展示所有叶子节点
) {
  return keywords
    ? dataSource.reduce((filtered, d) => {
        const isMatch = filterFunc(keywords, d);
        let isChildrenMatch;
        if (filterLeaf && d.children?.every((c) => c.isLeaf)) {
          isChildrenMatch =
            isMatch || d.children.some((c) => filterFunc(keywords, c)) ? d.children : void 0;
        } else {
          isChildrenMatch =
            d.children && filterListOrTree(d.children, keywords, filterFunc, filterLeaf);
        }
        if (isMatch || (isChildrenMatch && isChildrenMatch.length > 0)) {
          filtered.push({ ...d, children: isChildrenMatch });
        }
        return filtered;
      }, [])
    : dataSource;
}

const r = filterListOrTree(
  [jdDict1],
  // '非离退休',
  // '车辆用途',
  '部级干部公务用车',
  (keywords, data) => data.dictName.includes(keywords),
  false
);
console.log(r);
