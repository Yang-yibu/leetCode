import { list2tree2 } from './index';

const list = [
  { id: 'd1', pid: '', label: '财政总指标', value: 4502, 指标金额: 1000 },
  { id: 'd1-1', pid: 'd1', label: 'A 单位', value: 4502 },
  { id: 'd1-1-1', pid: 'd1-1', label: '资金支付-收款单位', value: 4502, 剩余金额: 1000 },
  { id: 'd1-1-2', pid: 'd1-1', label: '资金支付-城投公司', value: 4502 },
  { id: 'd1-2', pid: 'd1', label: 'B 单位', value: 4502 },
];

var l = list2tree2(list, { valRootPid: '', propPid: 'pid', idKey: 'id' });
console.log(l);
