/**
 * 获取给定精度的数据，确保valueList中的百分比之和为1
 * - 采用最大余数法 - ECharts 中计算方法
 * - https://github.com/apache/echarts/issues/10400
 * - 饼图百分比BUG http://zhangwenli.com/blog/2017/06/13/pie-percentage/
 * - https://en.wikipedia.org/wiki/Largest_remainder_method
 * @param {number[]} valueList 所有数据的列表
 * @param {number} idx 数据的索引
 * @param {number} precision 精度
 * @return {number} 百分数
 */
export function getPercentWithPrecision(valueList, idx, precision) {
  if (!valueList[idx]) {
    return 0;
  }

  var sum = valueList.reduce(function (acc, val) {
    return acc + (isNaN(val) ? 0 : val);
  }, 0);
  if (sum === 0) {
    return 0;
  }

  var digits = Math.pow(10, precision);
  var votesPerQuota = valueList.map((val) => {
    return ((isNaN(val) ? 0 : val) / sum) * digits * 100;
  });
  var targetSeats = digits * 100;

  var seats = votesPerQuota.map((votes) => Math.floor(votes));
  var currentSum = seats.reduce(function (acc, val) {
    return acc + val;
  }, 0);

  var remainder = votesPerQuota.map((votes, idx) => votes - seats[idx]);

  // Has remainding votes.
  while (currentSum < targetSeats) {
    // Find next largest remainder.
    var max = -Infinity; // Number.NEGATIVE_INFINITY;
    var maxId = null;
    for (var i = 0, len = remainder.length; i < len; ++i) {
      if (remainder[i] > max) {
        max = remainder[i];
        maxId = i;
      }
    }

    // Add a vote to max remainder.
    ++seats[maxId];
    remainder[maxId] = 0;
    ++currentSum;
  }

  return seats[idx] / digits;
}
