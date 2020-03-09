/* eslint-disable */

/**
 * countBinarySubstrings
 */

// export default (str) => {
//     // 建立数据结构：堆栈，用来保存数据
//     let result = [];
//     for (let i = 0; i < str.length - 1; i++) {
//         let r = str.slice(i);
//         if (r) {
//             result.push(r);
//         }
//     }
//     return result;
// }


export default (str) => {
    // 建立数据结构：堆栈，用来保存数据
    let result = [];

    /**
     * 给定任意的子输入，都返回一个符合条件的子串
     * 01 | 0011 | 1100
     */
    function match (s) {
        // 从字符串起始 找到连续的 0 或 1
        let j = s.match(/^(0+|1+)/)[0];
        
        // let o = (j[0] * 1 ? 0: 1).toString().repeat(j.length);
        let o = (j[0] ^ 1).toString().repeat(j.length);

        let reg = new RegExp(`^${j}${o}`);
        if (reg.test(s)) {
            return j + o
        } else {
            return '';
        }
    }

    for (let i = 0; i < str.length - 1; i++) {
        let subStr = match(str.slice(i));

        if (subStr) {
            result.push(subStr);
        }
    }

    return result;
}
