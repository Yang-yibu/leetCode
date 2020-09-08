import defaultTree from './treeAddProp_val.js';

/**
 * 为树节点添加属性
 * @param {[]} tree - 树节点
 * @param {object} props
 * @param {string} [props.childrenProp = 'nodes']
 * @param {(node: object, pos: [number]) => object} processNode
 *
 * @description 纯函数，不会改变源数据
 */
const treeNodeAddProp = (tree, { childrenProp = 'nodes' }, processNode) => {
  let childrenNode = (dataTree, parentPos) => {
    return dataTree.map((item, index) => {
      let pos = parentPos.concat(index);

      item = typeof processNode === 'function' && processNode(item, pos);

      if (item[childrenProp] && item[childrenProp].length) {
        return { ...item, [childrenProp]: childrenNode(item[childrenProp], pos) };
      }

      return { ...item };
    });
  };

  return childrenNode(tree, [0]);
};

// export default treeNodeAddProp;
let process = treeNodeAddProp([defaultTree], { childrenProp: 'children' }, function (node, pos) {
  let newNode = { title: node.text };
  if (node.nodes && node.nodes.length) {
    newNode.children = node.nodes;
  }
  newNode.pos = pos;
  return newNode;
});
console.log(process);
