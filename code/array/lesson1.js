/**
 * 建立电话号码的键盘映射
 * 把输入的字符串分割成数组 234 => [2, 3, 4]
 * 保存键盘映射后的字母内容，23 => ['abc', 'def']
 */
let telComb = (str) => {
  let map = ['', 1, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
  let numArr = str.split('');

  let code = [];
  numArr.forEach(item => {
    // if (map[item]) {
    if (item >= 1) {
      code.push(map[item]);
    }
  });

  /**
   * 组合数组前两项
   * @param { array } arr
   */
  let comb = (arr) => {
    let temp = [];
    for (let i = 0, iLen = arr[0].length; i < iLen; i++) {
      for (let j = 0, jLen = arr[1].length; j < jLen; j++) {
        temp.push(arr[0][i] + arr[1][j])
      }
    }

    // 把前两个数组组合完成后，用 temp 替代
    // arr.slice(0, 2, temp);
    arr.splice(0, 2, temp);

    if (arr.length > 1) {
      return comb(arr);
    } else {
      return temp
    }
  }

  return comb(code);

}

// 回溯 回溯是一种通过穷举所有可能情况来找到所有解的算法
let telComb1 = (numStr) => {
  let MapHash = {
    "2": "abc",
    "3": "def",
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz",
  }

  let output = [];
  let backtrack = (combination, next_str) => {
    // 检查是否有更多的字符串
    if (next_str.length == 0) {
      output.push(combination);
    }
    else {
      let str = next_str.substring(0, 1);
      let letter = MapHash[str];

      for (let i = 0, len = letter.length; i < len; i++) {
        letter = MapHash[str].substring(i, i + 1);

        backtrack(combination + letter, next_str.substring(1));
      }
    }
  }

  if (numStr) {
    backtrack('', numStr)
  }
  return output;
}

// debugger
// export default telComb;
// telComb1('23')

export default telComb1;
// telComb1('23')
