// @ts-check

import dateRangeDays from "../date/dateRangeDays";

/**
 * @typedef {Object} ServerTime
 * @property {string=} TK_ID
 * @property {string} TK_START_DATE
 * @property {string} TK_END_DATE
 */

/**
 * 转换为服务器需要数据 - 踏勘时间段
 * @param {{id: string|number, time: [string, string]}[]} tkTimes
 * @param {string} startDate 起始时间 - yyyy-MM-dd HH:mm:ss
 * @param {string} endDate 终止时间 - yyyy-MM-dd HH:mm:ss
 * @param {ServerTime[]} serverTimes 服务器需要的时间段
 */
export default function toServerTkTimes(tkTimes, startDate, endDate, serverTimes) {
	function buildKey(start, end) {
		return [start, end].join('至');
	}
	const serverTimesMap = {};
	serverTimes.map(item => {
		const key = buildKey(item.TK_START_DATE, item.TK_END_DATE);
		serverTimesMap[key] = item;
	});

  const times = [];
  tkTimes = tkTimes.filter(item => Array.isArray(item.time) && item.time[0] && item.time[1])

	dateRangeDays(startDate, endDate).map(date => {
		tkTimes.map(item => {
			const start = `${date} ${item.time[0]}`;
			const end = `${date} ${item.time[1]}`;
			const key = buildKey(start, end);

			/** @type {ServerTime} */
			const t = { TK_START_DATE: start, TK_END_DATE: end };
			if (serverTimesMap[key]) {
				Object.assign(t, { IS_NEW: false, TK_ID: serverTimesMap[key].TK_ID });
			}

			times.push(t);
		});
	});

	return times;
}
