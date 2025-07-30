import defaultTree from './treeAddProp_val.js';

/**
 * 为树节点添加属性
 * @param {[]} tree - 树节点
 * @param {object} props
 * @param {string} [props.childrenProp = 'nodes']
 * @param {number[]} [props.initPos = []]
 * @param {(node: object, pos: [number], pNode?: object) => object} processNode
 *
 * @example
 * treeNodeAddProp([{label: '1'}, '12'], {}, (node) => {
 *  console.log(node);
 *  return typeof node ==='string'? { label: node }: node
 * }) // [{ label: '1'}, { label: '12'}]
 *
 * @description 纯函数，不会改变源数据
 */
export const treeNodeAddProp = (tree, props, processNode = (item) => item) => {
  const { childrenProp = 'nodes', initPos = [] } = props || {};

  const childrenNode = (dataTrees, parentPos, pNode) => {
    return dataTrees.map((item, index) => {
      const pos = parentPos.concat(index);

      const _item = typeof processNode === 'function' && processNode(item, pos, pNode);

      if (item[childrenProp] && item[childrenProp].length) {
        return { ..._item, [childrenProp]: childrenNode(item[childrenProp], pos, item) };
      }

      return { ..._item };
    });
  };

  return childrenNode(tree, initPos);
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
