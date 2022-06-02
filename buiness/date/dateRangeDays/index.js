const moment = require("moment");

/**
 * 日期区间内，所有日期
 * @param {string} start 开始日期
 * @param {string} end 结束日期
 */
export default function dateRangeDays(start, end) {
  const formatStr = 'YYYY-MM-DD'
  const s = moment(start)
  const e = moment(end)
  if (!((start && end && s.isSameOrBefore(e)))) {
    return []
  }

  const days = []
  while (s.isSameOrBefore(e)) {
    days.push(s.format(formatStr))
    s.add(1, 'day')
  }

  return days
}


