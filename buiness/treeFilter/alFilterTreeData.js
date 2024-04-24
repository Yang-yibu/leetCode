import { jdDict1 } from './dic';

export function fillLegacyProps(dataNode) {
  if (!dataNode) {
    return dataNode;
  }

  const cloneNode = { ...dataNode };

  if (!('props' in cloneNode)) {
    Object.defineProperty(cloneNode, 'props', {
      get() {
        // warning(
        console.warn(
          false,
          'New `rc-tree-select` not support return node instance as argument anymore. Please consider to remove `props` access.'
        );
        return cloneNode;
      },
    });
  }

  return cloneNode;
}
/**
 * @typedef {object} DefaultOptionType
 * @property {string} label
 * @property {string} value
 */
/**
 * @param {{}[]} treeData 树结构
 * @param {string} searchValue 搜索内容
 * @param {object} p2
 * @param {string} p2.treeNodeFilterProp 要搜索的节点字段属性
 * @param {boolean | ((inputValue: string, treeNode: DefaultOptionType) => boolean)} [p2.filterTreeNode] 是否搜索或自定义搜索逻辑
 * @param {boolean | ((treeNode: DefaultOptionType) => DefaultOptionType)} [p2.fmtTreeNode] 是否搜索或自定义搜索逻辑
 * @param {{label?: string, value?: string, children?: string}} p2.fieldNames 树节点字段名称配置
 * @returns
 */
const alFilterTreeData = (
  treeData,
  searchValue,
  { fmtTreeNode, treeNodeFilterProp, filterTreeNode, fieldNames }
) => {
  const { children: fieldChildren = 'children' } = fieldNames || {};
  const _fmtTreeNode = typeof fmtTreeNode === 'function' ? fmtTreeNode : (tn) => tn;

  return () => {
    if (!searchValue || filterTreeNode === false) {
      return treeData;
    }

    let filterOptionFunc;
    if (typeof filterTreeNode === 'function') {
      filterOptionFunc = filterTreeNode;
    } else {
      const upperStr = searchValue.toUpperCase();
      filterOptionFunc = (_, dataNode) => {
        const value = dataNode[treeNodeFilterProp || 'value'];

        return String(value).toUpperCase().includes(upperStr);
      };
    }

    /**
     * @param {*[]} list 当前一级树节点
     * @param {boolean} keepAll 某个节点所有下级
     * @returns
     */
    function dig(list = [], keepAll = false) {
      return list.reduce((total, dataNode) => {
        const children = dataNode[fieldChildren];

        // 控制是否保留所有下级（父级选中，所有下级也选中）
        // TODO: 需要测试，不显示下级的情况
        const match = keepAll || filterOptionFunc(searchValue, fillLegacyProps(dataNode));
        const childList = dig(children || [], match);
        // const childList = dig(children || [], false);

        if (match || childList.length) {
          total.push({
            ..._fmtTreeNode(dataNode),
            // isLeaf: undefined,
            [fieldChildren]: childList,
          });
        }
        return total;
      }, []);
    }

    return dig(treeData);
  };
};

const t = alFilterTreeData([jdDict1], '公务用车', {
  treeNodeFilterProp: 'dictName',
  fmtTreeNode: (n) => {
    n.text = '1';
    return n;
  },
})();

console.log(t);
