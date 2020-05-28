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

function list2tree2(list, { valRootPid = 'null', propPid = 'parentId' } = {}, processItem) {
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
    var id = item.id;
    if (group.hasOwnProperty(id)) {
      item.children = group[id];
    }
  });

  return group[valRootPid];
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
