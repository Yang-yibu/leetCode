/**
 * @file 列表转树
 */

/**
 * 列表转树
 * @param {Array} list 源列表
 */
function list2tree(list) {
  const group = {};
  list.forEach((item) => {
    const parentId = item.parentId;
    if (!group.hasOwnProperty(parentId)) {
      group[parentId] = [];
    }
    group[parentId].push(item);
  });

  list.forEach(function (item) {
    var id = item.id;
    if (group.hasOwnProperty(id)) {
      item.children = group[id];
    }
  });

  return group['null'];
}

function list2tree2(
  list,
  { valRootPid = 'null', propPid = 'parentId', idKey = 'id', childrenKey = 'children' } = {},
  processItem
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
    if (!group.hasOwnProperty(parentId)) {
      group[parentId] = [];
    }
    group[parentId].push(item);
  });

  listTmp.forEach(function (item) {
    var id = item[idKey];
    if (group.hasOwnProperty(id)) {
      item[childrenKey] = group[id];
    }
  });

  return group[valRootPid];
}
// zTree tree2List
function tree2List(nodes, conf, pNode = {}) {
  conf = Object.assign(
    {},
    {
      childrenKey: 'children',
      processNode: function (node) {
        return node;
      },
    },
    conf
  );
  if (!nodes) return [];
  var result = [];
  if (Array.isArray(nodes)) {
    for (let i = 0, len = nodes.length; i < len; i++) {
      _do(nodes[i], pNode);
    }
  } else {
    _do(nodes);
  }
  return result;

  function _do(_n, _pNode = {}) {
    let _node = { ..._n };
    let childrenArr = _node[conf.childrenKey];
    delete _node[conf.childrenKey];
    result.push(conf.processNode(_node, _pNode));
    if (childrenArr) {
      result = result.concat(tree2List(childrenArr, conf, _node));
    }
  }
}

function treeHasChecked(nodes, conf) {
  let ns = tree2List(nodes, conf).filter((item) => item[conf.checkedKey]);
  return list2tree(ns, conf);
}

var list = [
  { id: 1, name: 'child1', parentId: 0 },
  { id: 2, name: 'child2', parentId: 0 },
  { id: 6, name: 'child2_1', parentId: 2 },
  // { id: 0, name: 'root', parentId: null },
  { id: 5, name: 'child1_2', parentId: 1 },
  { id: 4, name: 'child1_1', parentId: 1 },
  { id: 3, name: 'child3', parentId: 0 },
  { id: 7, name: 'child3_1', parentId: 3 },
];

let result = list2tree2(list);
console.log(JSON.stringify(result, '', '  '));

// TODO: zTree 的实现方式
// https://github.com/zTree/zTree_v3
