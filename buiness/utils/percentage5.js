/**
 * Get a data of given precision, assuring the sum of percentages
 * in valueList is 1.
 * The largest remainder method is used.
 * https://en.wikipedia.org/wiki/Largest_remainder_method
 *
 * @param valueList a list of all data
 * @param idx index of the data to be processed in valueList
 * @param precision integer number showing digits of precision
 * @return percent ranging from 0 to 100
 */
export function getPercentWithPrecision(valueList, idx, precision) {
  if (!valueList[idx]) {
    return 0;
  }

  var seats = getPercentSeats(valueList, precision);
  return seats[idx] || 0;
}
/**
 * Get a data of given precision, assuring the sum of percentages
 * in valueList is 1.
 * The largest remainder method is used.
 * https://en.wikipedia.org/wiki/Largest_remainder_method
 *
 * @param valueList a list of all data
 * @param precision integer number showing digits of precision
 * @return {Array<number>}
 */
export function getPercentSeats(valueList, precision) {
  var sum = Array.prototype.reduce.call(
    valueList,
    function (acc, val) {
      return acc + (isNaN(val) ? 0 : val);
    },
    0
  );

  if (sum === 0) {
    return [];
  }

  var digits = Math.pow(10, precision);
  var votesPerQuota = Array.prototype.map.call(valueList, function (val) {
    return ((isNaN(val) ? 0 : val) / sum) * digits * 100;
  });
  var targetSeats = digits * 100;
  var seats = Array.prototype.map.call(votesPerQuota, function (votes) {
    // Assign automatic seats.
    return Math.floor(votes);
  });
  var currentSum = Array.prototype.reduce.call(
    seats,
    function (acc, val) {
      return acc + val;
    },
    0
  );
  var remainder = Array.prototype.map.call(votesPerQuota, function (votes, idx) {
    return votes - seats[idx];
  }); // Has remainding votes.

  while (currentSum < targetSeats) {
    // Find next largest remainder.
    var max = Number.NEGATIVE_INFINITY;
    var maxId = null;

    for (var i = 0, len = remainder.length; i < len; ++i) {
      if (remainder[i] > max) {
        max = remainder[i];
        maxId = i;
      }
    } // Add a vote to max remainder.

    ++seats[maxId];
    remainder[maxId] = 0;
    ++currentSum;
  }

  return Array.prototype.map.call(seats, function (seat) {
    return seat / digits;
  });
}
