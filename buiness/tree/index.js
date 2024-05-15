function removeNode(records = [], _ri = []) {
  let _childRecord = records;

  // eval('d[0]["a"]')
  _ri.map((v, i) => {
    if (i === _ri.length - 1) {
      _childRecord.splice(v, 1);
      return;
    }
    _childRecord = _childRecord[v].children;
  });

  console.log(JSON.stringify(records, undefined, 2));
  return records;
}

const rec = [
  { id: 1, name: '1', children: [{ id: '1-1', name: '1-1' }] },
  { id: 2, name: '2', children: [{ id: '2-1', name: '2-1' }] },
];
removeNode(rec, [0, 0]);
