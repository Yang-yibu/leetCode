/**
 * 字符串 s 是否符合 模式 p 的规律
 * @param {string} s 字符串
 * @param {*string} p 字符规律
 */
// 审题不清！没有模拟正则表达式
// let isMatch = (s, p) => {
//     let reg = new RegExp(p, 'g');
//     let match = s.match(reg);
//     return (match && match[0] === s) ? true: false;
// }

let isMatch = (s, p) => {
    let isMatchSingle = (s, p) => {
        // 边界情况：s 和 p 都没有了，说明处理完所有的字符了
        if (p.length <= 0) {
            // p 完了，但是 s 还有，说明不匹配 返回 false
            return s.length ? false : true;
        }

        // 当前 s 和 p 的首个字母是否匹配
        let match = false;
        if (s.length > 0 && (s[0] === p[0] || p[0] === '.')) {
            match = true;
        }

        if (p.length > 1 && p[1] === '*') {
            /* p 首位字符后边跟着模式 'a*', 检测 a* 是否与 s 的首位相匹配
             * case1. 'a*': * 为 0 的时候
             * case2. 'a*': * 大于等于 1 的时候（用来表示 a* 匹配多个 s）
             *      看 s 的首位是否与 p首位匹配，如果匹配 删除 s 的第一位；重复；
            */
            return isMatchSingle(s, p.slice(2)) || (match && isMatchSingle(s.slice(1), p))
        } else {
            // 正常字符：首位匹配，删除各自第一个字符校验剩余的字符串
            return match && isMatchSingle(s.slice(1), p.slice(1))
        }
    }

    return isMatchSingle(s, p);
}

export default isMatch;
// debugger
// console.log(isMatch(''));
// console.log(isMatch('ab', '.*c'));
