
## 测试结果是 A 或者 B

```js
// status.js
function getStatus() {
  // 这里是一个示例实现，你可以根据实际情况修改
  return Math.random() > 0.5 ? 'A' : 'B';
}
module.exports = getStatus;

// status.test.js
const getStatus = require('./status');
test('getStatus returns either A or B', () => {
  const result = getStatus();
  expect(['A', 'B']).toContain(result);
});
test('getStatus returns either A or B', () => {
  const result = getStatus();
  expect(result === 'A' || result === 'B').toBe(true);
});


// ----------

test('getStatus returns either A or B', () => {
  const result = Math.random() > 0.5 ? { key: 1 } : { key: '2' };
  expect([{ key: 1 }, { key: '2'} ]).toContainEqual({ key: 1});
});
```
