import { arrInsertAfter2 } from '../array/insertArr';
import { arrSwap, getValByPath3 } from '../utils/fn';

const arrInsertAfter = arrInsertAfter2;

/**
 * 节点是否可以进行移动操作
 * @param {number | number[]} ri 选中单元格路径
 */
function setActionsDisabled(ri, records) {
  const dis = { levelUp: false, levelDown: false, up: false, down: false };

  // this.curSelCellPos = { col, row };
  // const ri = this.tIns.getRecordIndexByCell(col, row);

  const _ri = [].concat(ri);
  const _pri = _ri.slice(0, -1);
  const _cri = _ri.slice(-1)[0];
  // const records = this.tIns.records;

  const pRecord = getValByPath3(records, _pri);
  if (_ri.length === 1) {
    dis.levelUp = true;
    if (_cri === 0) {
      dis.levelDown = true;
      dis.up = true;
    }
    if (_cri === (pRecord.children || pRecord).length - 1) {
      dis.down = true;
    }
  } else {
    if (_cri === 0) {
      dis.levelDown = true;
      dis.up = true;
    }
    if (_cri === (pRecord.children || pRecord).length - 1) {
      dis.down = true;
    }
  }

  // this.actionDis = dis;
  return dis;
}

/**
 * 节点移动
 * @param {any[]} trees
 * @param {number| number[]} selNode 选中节点路径
 * @param {'levelUp' | 'levelDown' | 'up' | 'down'} type 选中节点路径
 */
export function moveNode(trees = [], selNode, type) {
  if (setActionsDisabled(selNode, trees)[type]) {
    // 不允许操作
    return 'stop';
  }

  // const pos = this.curSelCellPos;
  // const records = this.tIns.records;
  // const ri = this.tIns.getRecordIndexByCell(pos.col, pos.row);
  const records = trees;
  const ri = selNode;

  /** 单元格在 tree 路径 */
  const _ri = [].concat(ri);
  /** 父级单元格路径 */
  const _pri = _ri.slice(0, -1);
  /** 单元格同级下标 */
  const _cri = _ri.slice(-1)[0];

  const pRecord = getValByPath3(records, _pri);
  const pRecordChild = pRecord.children || pRecord;
  const curNode = pRecordChild[_cri];
  // let swapPos;
  // ===============

  switch (type) {
    case 'levelUp': {
      const rearNodes = pRecordChild.slice(_cri + 1);
      if (rearNodes.length) {
        if (!curNode.children) {
          curNode.children = [];
        }
        curNode.hierarchyState = 'expand';
        pRecordChild[_cri].children.push(...rearNodes);
      }
      pRecordChild.splice(_cri);
      if (!pRecordChild.length) {
        delete pRecord.hierarchyState;
        delete pRecord.children;
      }
      if (_cri === 0) {
        delete pRecord.hierarchyState;
      }

      /** 父父级路径 */
      const _ppri = _ri.slice(0, -2);
      const ppRecords = getValByPath3(records, _ppri);
      arrInsertAfter(ppRecords.children || ppRecords, curNode, _pri.reverse()[0]);

      break;
    }
    case 'levelDown': {
      const prevNode = pRecordChild[_cri - 1];
      prevNode.hierarchyState = 'expand';
      if (!prevNode.children) prevNode.children = [];
      prevNode.children.push(...pRecordChild.splice(_cri, 1));

      break;
    }
    case 'up': {
      arrSwap(pRecordChild, _cri, _cri - 1);
      // swapPos = { col: pos.col, row: pos.row - 1 };
      break;
    }
    case 'down': {
      arrSwap(pRecordChild, _cri + 1, _cri);
      // swapPos = { col: pos.col, row: pos.row + 1 };
      break;
    }
  }

  return records;
}
