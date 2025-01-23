import DownExcel from './xlsxExport';

new DownExcel({
  header: [
    {
      field: 'c1',
      title: 'c111',
      children: [
        {
          field: 'c2',
          title: 'c222',
        },
        {
          field: 'c3',
          title: 'c333',
        },
        {
          field: 'c4',
          title: 'c444',
        },
      ],
    },
  ],
}).down(`${+new Date()}`, [
  {
    a111: 'LLL',
    c1: 'HHH',
    c2: 'AAA',
    a444: 'III',
  },
]);
