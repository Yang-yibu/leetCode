
## 基础算法 数组类

电话号码的组合 --- 公式运算。数学公式相关的运算，如 组合运算

卡牌分组 --- 归类运算

种花问题 --- 筛选（过滤）运算

格雷编码 --- 二进制运算

### 电话号码组合

[leetCode: 17](https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/)

#### 思路

<img alt="题目" src="./assets/2019-05-30-19-22-02.png" width="1000" />

<img alt="思路 1" src="./assets/2019-05-30-19-26-42.png" width="1000" />

<img alt="思路 2" src="./assets/2019-05-30-19-27-14.png" width="1000" />

```js
/**
 * @param start - 修改的开始位置
 * @param deleteCount - 删除的数量
 * @return 被删除元素组成的数组
 */
Array.prototype.splice(start[, deleteCount[, item1[, item2[, ...]]]])

/**
 * 根据 start 与 end 提取数组元素，并返回新数组
 * @param {number} [start = 0] - 包含当前；负数表示倒数；
 * @param {number} [end] - 不包含（-1 表示倒数第一个）；省略表示截取到结尾；负数表示倒数；大于数组长度表示到数组末尾
 * @return 含有提取元素的新数组
 */
Array.prototype.slice(start, end)

/**
 * 获取字符串的子串
 * @return 返回 start 与 end 之间的子串
 * @param {number} indexStart - 截取的第一个字符的索引（包含当前索引）
 * @param {number=} indexEnd - 可选；结束索引（不包含当前索引）；取值为 [0, str.length]
 * 
 * @desc
 * 1. indexStart === indexEnd: 返回空串
 * 2. indexEnd 省略：提取到末尾
 * 3. 参数小于 0 或 NaN，默认为 0
 * 4. 大于 str.length, 当作 str.length
 */
String.prototype.substring(indexStart, indexEnd)
/**
 * 获取字符串的子串
 * @return 
 * @param {number} beginIndex - 字符串中字符下标，从索引处提取字符；负数意味倒数（strLength + beginIndex）
 * @param {number=} endIndex - 可选；省略则为 str.length；负数意味倒数
 */
String.prototype.slice(beginIndex, endIndex)
```

[回溯算法](https://baike.baidu.com/item/%E5%9B%9E%E6%BA%AF%E7%AE%97%E6%B3%95/9258495)：是一个类似枚举的搜索尝试过程，主要是在搜索尝试过程中寻找问题的解，当发现不满足求解条件时，就“回溯”返回，尝试别的路径。

回溯算法解决问题的一般步骤：
- 针对所给问题，定义问题的解空间，至少包含问题的一个（最优）解
- 确定易于搜索的解空间结构，使得能用回溯法方便的搜索整个解空间
- 以深度优先的方式搜索解空间

### 卡牌分组

#### 知识点

```js

Array.prototype.sort()

/**
 * 删除数组的第一个元素 直接修改原有数组
 * @return 原数组的第一个元素 | 数组为空 返回 undefined
 */ 
Array.prototype.shift()

/**
 * 向数组开头添加一个或更多元素
 * @return 添加后的数组长度
 * 
 * @example 
 * // return 4
 * var a = [1,2]; a.unshift(3,4);
 * a // [3, 4, 1, 2]
 */ 
Array.prototype.unshift()
```


#### 求最大公约数

**更相减损法 （辗转相减法）**

**辗转相除法（欧几里得算法 Euclidean algorithm）**

用较大的数除以较小数，再用出现的余数（第一余数）去除除数，再用出现的余数（第二余数）去除第一余数，如此反复，直到最后余数是 0。

如果求两个数的最大公约数，最后的除数就是这两个数的最大公约数。

```js
gcd(除数, 第一余数)

gcd(第一余数, 第二余数(第一余数 % 除数))
```

### 种花问题

[leetCode: 605](https://leetcode-cn.com/problems/can-place-flowers/)

1. 边界问题
2. 条件

#### 知识点

问题抽象、数学建模的思想、动态输入（输入对思维的检验，不断调整输入）

AI 讲究的就是训练模型，就是不断的变换动态输入。让规则（实现）适应更多的情况


### 格雷编码

[leetCode: 89](https://leetcode-cn.com/problems/gray-code/)

![思路](./assets/2019-05-31-23-11-46.png)

发现规律、 动态输
