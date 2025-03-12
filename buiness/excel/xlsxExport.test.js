import DownExcel from './xlsxExport';

new DownExcel({
  propField: 'field',
  titleField: 'title',
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
    c1: 'LLL',
    c2: 'HHH',
    c3: '124',
    c4: 124,
  },
]);
