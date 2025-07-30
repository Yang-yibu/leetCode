import { dataTjfxGc } from './datasource';
import { buildMapPos2TF, getAllCells } from './format';

const allCells = getAllCells(dataTjfxGc);
console.log(allCells);

const metaMap = buildMapPos2TF(allCells);

console.log(metaMap.mapPos2TF);
console.log(metaMap.mapTF2Pos);
