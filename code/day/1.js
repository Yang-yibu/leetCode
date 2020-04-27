
function searchMatrix (matrix, target) {
  let flag = false
  for (let i = 0; i < matrix.length; i++) {
    let item = matrix[i]
    if ((item[0] <= target) && (target <= item[item.length - 1])) {
      item.forEach(element => {
        if (element === target) {
          flag = true
        }
      })
    }
  }
  return flag
}

export default searchMatrix
