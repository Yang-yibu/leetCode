
/** 根据树节点路径查找节点 */
export function findTreeNode<
  T extends {
    key: string | number;
    children?: T[];
  },
>(path: string[], nodes: T[] | undefined): T | undefined {
  if (path.length > 0) {
    const currentNode = nodes?.find(({ key }) => key === path[0]);
    return path.length > 1
      ? findTreeNode(path.slice(1), currentNode?.children)
      : currentNode;
  }
}

export const loopTree = (data, key: string, keyname: string, callback) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].key === key) {
      return callback(data[i], i, data);
    }
    if (data[i].children) {
      loopTree(data[i].children, key, keyname, callback);
    }
  }
};
