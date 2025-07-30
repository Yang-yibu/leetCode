
export function filterListOrTree<T extends { children?: T[] }>(
  dataSource: T[],
  keywords: string,
  filterFunc: (keywords: string, data: T) => boolean,
  filterLeaf?: boolean, // 是否展示所有叶子节点
) {
  return keywords
    ? dataSource.reduce<T[]>((filtered, d) => {
      const isMatch = filterFunc(keywords, d);
      let isChildrenMatch: T[] | undefined;
      if (filterLeaf && d.children?.every(c => (c as any).isLeaf)) {
        isChildrenMatch =
          isMatch || d.children.some(c => filterFunc(keywords, c))
            ? d.children
            : void 0;
      } else {
        isChildrenMatch =
          d.children &&
          filterListOrTree(d.children, keywords, filterFunc, filterLeaf);
      }
      if (isMatch || (isChildrenMatch && isChildrenMatch.length > 0)) {
        filtered.push({ ...d, children: isChildrenMatch });
      }
      return filtered;
    }, [])
    : dataSource;
}


