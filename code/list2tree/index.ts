type conf = {
  /** 根节点值 */
  valRootPid?: string;
  /** pid 字段名，默认 parentId */
  propPid?: string;
  /** id 字段名 */
  idKey?: string;
  /** children 字段名 */
  childrenKey?: string;
};

/**
 * 列表转树
 * - TODO: valRootPid=null 或 undefined 需要测试
 */
export function list2tree2<T>(
  list: T[],
  { valRootPid = 'null', propPid = 'parentId', idKey = 'id', childrenKey = 'children' }: conf = {},
  /** 处理节点其他属性数据 */
  processItem: (node: T) => any
) {
  let listTmp = list;
  if (typeof processItem === 'function') {
    listTmp = list.map((item) => {
      let itemTmp = processItem({ ...item }) || item;
      return itemTmp;
    });
  }

  const group = {};
  listTmp.forEach((item) => {
    const parentId = item[propPid];
    if (!Object.prototype.hasOwnProperty.call(group, parentId)) {
      // if (!group.hasOwnProperty(parentId)) {
      group[parentId] = [];
    }
    group[parentId].push(item);
  });

  listTmp.forEach(function (item) {
    var id = item[idKey];
    if (Object.prototype.hasOwnProperty.call(group, id)) {
      // if (group.hasOwnProperty(id)) {
      item[childrenKey] = group[id];
    }
  });

  return group[valRootPid];
}

type TreeNodeAddProps = (
  tree: any[],
  props?: {
    /** children 属性，默认 children */
    childrenProp?: string;
    initPos?: number[];
    fnResOnlyRender?: boolean;
  },
  processNode?: (item: object, pos: number[], pNode?: object) => object
) => any[];

/**
 * 为树节点添加属性
 * @example
 * treeNodeAddProp([{label: '1'}, '12'], {}, (node) => {
 *  console.log(node);
 *  return typeof node ==='string'? { label: node }: node
 * }) // [{ label: '1'}, { label: '12'}]
 *
 * @description 纯函数，不会改变源数据
 */
export const treeNodeAddProp: TreeNodeAddProps = (tree, props, processNode = (item) => item) => {
  const { childrenProp = 'children', initPos = [], fnResOnlyRender } = props || {};

  const childrenNode = (dataTrees, parentPos, pNode) => {
    return dataTrees.map((item, index) => {
      const pos = parentPos.concat(index);

      const _item = typeof processNode === 'function' && processNode(item, pos, pNode);

      if (item[childrenProp] && item[childrenProp].length) {
        return { ..._item, [childrenProp]: childrenNode(item[childrenProp], pos, item) };
      }

      if (fnResOnlyRender) {
        return _item;
      }
      return { ..._item };
    });
  };

  return childrenNode(tree, initPos, undefined);
};
