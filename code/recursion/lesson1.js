/* eslint-disable */

/**
 * 根据字符串复原 IP 地址
 * @param {string} str
 * @return {string[]}
 */
let restoreIpAddress = function (str) {
    let r = [];


    /**
     * 检查 IP 片段是否符合规则
     * @param {string} segment IP 片段
     * @return {boolean}
     */
    let valid = function (segment) {
        let len = segment.length;

        if (len > 3) return false;

        return segment[0] != '0' ? segment * 1 < 256 : len === 1;
    }

    /**
     * 搜索符合要求的子 IP 串
     * @param {string[]} subIp 符合要求的子 IP 串
     * @param {string} subStr 剩余的子字符串
     */
    let search = function (subIp, subStr) {
        if ( subIp.length > 4 ) { return }

        if (subIp.length === 4 && subIp.join('') === str) {
            // 当前 IP 符合要求
            r.push(subIp.join('.'));
        } else {
            for (let i = 0, len = Math.min(3, subStr.length), tmp; i < len; i++) {
                tmp = subStr.substr(0, i + 1);
                // ip: [0, 255]
                if ( valid(tmp) ) {
                    search(subIp.concat(tmp), subStr.substr(i + 1))
                }
            }
        }
    }

    search([], str)

    return r;
}

export default restoreIpAddress;
// debugger
// console.log(restoreIpAddress('25525511135'));
