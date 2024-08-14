import { HyperFormula } from 'hyperformula';

const hfInstance = HyperFormula.buildFromArray([['1', '2', '=A1', '=B1+C1']]);

var vs = hfInstance.getCellPrecedents({ sheet: 0, col: 3, row: 0 });
console.log(vs);
