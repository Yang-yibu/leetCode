import { treeNodeAddProp } from '../../code/list2tree/treeAddProp';
import { buildTableNode } from './datasource';
import { Datasource } from './datasource.data';

// test('指定元素后插入内容', () => {
//   const nt = Datasource['138b1b1ea66d41f9b6eacc6319418234'].map(buildTableNode);

//   console.log(nt);
// });

const nt = Datasource['138b1b1ea66d41f9b6eacc6319418234'].map(buildTableNode);
const list = [];
treeNodeAddProp(nt, { childrenProp: 'children' }, (node) => {
  const n = { ...node };
  delete n.children;
  list.push(n);
});

console.log(list);
