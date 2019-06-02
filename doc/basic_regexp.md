
## 基础算法 正则表达式类

### 重复的子字符串

[leetCode: 459](https://leetcode-cn.com/problems/repeated-substring-pattern/)

重试基础、知识全面。不然知识点造成遗漏，会导致很多应用场景想不出有什么很好的思路

```sh
# 正则表达式的子表达式之 圆括号：正则表达式的引擎会将其匹配的字符串记录下来
`(x)` # 匹配 x 并记住匹配项 x，括号被称为 捕获括号
`(foo)(bar)\1\2` # 匹配 foo 和 bar 两个字符串并记住，\1 表示引用第一个表达式匹配的字符串；哪一个括号的左括号在前，那个排序在前

# \w 匹配单子字符 0-9A-Za-z
    # ( ASCII 顺序， A-Za-z 可简写成 A-z )

```

### 正则表达式匹配

[leetCode: 10](https://leetcode-cn.com/problems/regular-expression-matching/)

总结规律 分步演练
