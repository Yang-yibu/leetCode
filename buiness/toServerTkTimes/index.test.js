import toServerTkTimes from './index';

const tkTimes = [
	{
		id: 1647318466710,
		time: ['03:00:00', '14:59:59'],
	},
	{
		id: 1647318485007,
		time: ['20:00:00', '21:59:59'],
	},
];

const SlaveTkTimes = [
	{
		TK_ID: 383,
		STANDRAD_PUBLISH_ID: '15fbafd3-3838-44c3-ab4c-8b4a5fff52a3',
		TK_START_DATE: '2022-03-16 03:00:00',
		TK_END_DATE: '2022-03-16 14:59:59',
	},
	{
		TK_ID: 384,
		STANDRAD_PUBLISH_ID: '15fbafd3-3838-44c3-ab4c-8b4a5fff52a3',
		TK_START_DATE: '2022-03-16 20:00:00',
		TK_END_DATE: '2022-03-16 21:59:59',
	},
	{
		TK_ID: 385,
		STANDRAD_PUBLISH_ID: '15fbafd3-3838-44c3-ab4c-8b4a5fff52a3',
		TK_START_DATE: '2022-03-17 03:00:00',
		TK_END_DATE: '2022-03-17 14:59:59',
	},
	{
		TK_ID: 386,
		STANDRAD_PUBLISH_ID: '15fbafd3-3838-44c3-ab4c-8b4a5fff52a3',
		TK_START_DATE: '2022-03-17 20:00:00',
		TK_END_DATE: '2022-03-17 21:59:59',
	},
	{
		TK_ID: 387,
		STANDRAD_PUBLISH_ID: '15fbafd3-3838-44c3-ab4c-8b4a5fff52a3',
		TK_START_DATE: '2022-03-18 03:00:00',
		TK_END_DATE: '2022-03-18 14:59:59',
	},
	{
		TK_ID: 388,
		STANDRAD_PUBLISH_ID: '15fbafd3-3838-44c3-ab4c-8b4a5fff52a3',
		TK_START_DATE: '2022-03-18 20:00:00',
		TK_END_DATE: '2022-03-18 21:59:59',
	},
];
// const ts = toServerTkTimes(tkTimes, '2022-03-16', '2022-03-16', SlaveTkTimes);
// console.log(ts);

const tkTimes1 = [
  {
		id: 1647318466710,
		time: ['03:00:00', '14:59:59'],
	},
	{
		id: 1647318485007,
		time: '',
  },
  {
		id: 1647318466710,
		time: [],
	},
]
const ts1 = toServerTkTimes(tkTimes1, '2022-03-16', '2022-03-17', []);
console.log(ts1);


