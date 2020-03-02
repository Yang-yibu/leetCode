# Javascript 算法与数据结构

## 项目分支说明

```bash

# 自己练习 git 分支
master # 资源源码
dev    # 自己练习代码
temp   # 临时测试代码

# 课程源码仓库 imooc 分支介绍
master # 环境搭建原始内容
dev    # 所有源码
```

## 调试及运行

```bash
# 直接运行脚本 可用于调试
npx babel-node ./code/start/sum.js

# 执行单个测试文件
npx jest ./test/...
```

## Jest API

```js
// 使用 toBe() 可以比较原始值或者对象实例的引用值
// 内部是通过 Object.is 来比较两个值是否相等
// 不能使用 toBe 去测试浮点型数据因为 0.1+0.2 ！== 0.3
expect().toBe();

// 递归的比较对象实例的所有属性
expect().toEqual();

// 浮点数的比较用
expect()
    .toBeCloseTo()

    .toBeNull() // 只匹配 null
    .toBeUndefined() // 只匹配 undefined
    .toBeDefined() // 与 toBeUndefined 相反
    .toBeTruthy() // 匹配任何 if 为真
    .toBeFalsy(); // 匹配任何 if 为假

// 比较数字的匹配器
    .toBeGreaterThan() // 大于
    .toBeGreaterOrEqual() // 大于或等于
    .toBeLessThan() // 小于
    .toBeLessOrEqual() // 小于或等于

    .toContain(); // 检测数组中是否包含特定某一项
```
