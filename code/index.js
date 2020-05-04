
/**
 * 电话号码的字母组合
 * @param str 数字类型的字符串
 */
function letterCombinations (str) {
  let NumLetterMap = {
    1: [],
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z']
  }

  function twoArrComb (arr1, arr2) {
    let result = []

    arr1.map(item1 => {
      arr2.map(item2 => {
        result.push(item1 + item2)
      })
    })

    return result
  }
  if (!str.length) {
    return []
  }
  if (str.length === 1) {
    return NumLetterMap[str[0]]
  }

  let r = twoArrComb(NumLetterMap[str[0]], NumLetterMap[str[1]])
  for (let i = 2; i < str.length; i++) {
    r = twoArrComb(r, NumLetterMap[str[i]])
  }

  return r
}

console.log(JSON.stringify(letterCombinations('234')))
