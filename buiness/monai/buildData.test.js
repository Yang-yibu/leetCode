import { buildData } from './buildData';

const data = [
  {
    PAR: '0',
    ADCODE: 100000,
    // 已接入数: '42009',
    // NAME: '',
    TOOLTIP: '',
  },
  {
    PAR: '0',
    实有数: '40207',
    LNG: '116.413387',
    TOOLTIP: '省份：北京市;编制数：39631;实有数：40207;已接入数：42009;当年新能源汽车占比：4.97%',
    编制数: '39631',
    ADCODE: 110000,
    已接入数: '42009',
    当年新能源汽车占比: '4.97%',
    LAT: '39.910924',
    NAME: '北京市',
  },
  {
    PAR: '0',
    实有数: '52083',
    LNG: '113.75938',
    TOOLTIP: '省份：河南省;编制数：52323;实有数：52083;已接入数：54414;当年新能源汽车占比：4.72%',
    编制数: '52323',
    ADCODE: 410000,
    已接入数: '54414',
    当年新能源汽车占比: '4.72%',
    LAT: '34.771713',
    NAME: '河南省',
  },
];
test('联动热力图-1 name', () => {
  expect(
    buildData(
      [
        { name: 'value', mapper: '已接入数' },
        { name: 'tooltip', mapper: 'NAME' },
        { name: 'adcode', mapper: 'ADCODE', optional: true },
      ],
      data
    )
  ).toEqual([
    { value: '', tooltip: '' },
    { value: '42009', tooltip: '北京市' },
    { value: '54414', tooltip: '河南省' },
  ]);
});

test('联动热力图-2 tooltip 1.1', () => {
  expect(
    buildData(
      [
        { name: 'adcode', mapper: 'ADCODE' },
        { name: 'value', mapper: '实有数', optional: true },
        { name: 'tooltip', mapper: 'TOOLTIP', optional: true },
      ],
      data
    )
  ).toEqual([
    { adcode: 100000, tooltip: '' },
    {
      adcode: 110000,
      tooltip: '省份：北京市;编制数：39631;实有数：40207;已接入数：42009;当年新能源汽车占比：4.97%',
    },
    {
      adcode: 410000,
      tooltip: '省份：河南省;编制数：52323;实有数：52083;已接入数：54414;当年新能源汽车占比：4.72%',
    },
  ]);
});
