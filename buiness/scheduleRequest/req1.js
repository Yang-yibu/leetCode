// JS 请求调度器 https://juejin.cn/post/6936859831060037668

/**
 * mocked http get.
 * @param {string} url
 * @returns {{ url: string; delay: number; }}
 */
function httpGet(url) {
  const delay = Math.random() * 1000;

  console.info('GET', url);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        url,
        delay,
        at: Date.now(),
      });
    }, delay);
  });
}

// --------

/**
 * Schedule promises.
 * @param {Array<(...arg: any[]) => Promise<any>>} factories
 * @param {number} concurrency 并发数
 */
function schedulePromises(factories, concurrency) {
  /**
   * chunk
   * @param {any[]} arr
   * @param {number} size
   * @returns {Array<any[]>}
   */
  const chunk = (arr, size = 1) => {
    return arr.reduce((acc, cur, idx) => {
      const modulo = idx % size;

      if (modulo === 0) {
        acc[acc.length] = [cur];
      } else {
        acc[acc.length - 1].push(cur);
      }

      return acc;
    }, []);
  };

  const chunks = chunk(factories, concurrency);

  let resps = [];

  return chunks.reduce(
    (acc, cur) => {
      return acc
        .then(() => {
          console.log('批次 ---');
          return Promise.all(cur.map((f) => f()));
        })
        .then((intermediateResponses) => {
          resps.push(...intermediateResponses);

          return resps;
        });
    },

    Promise.resolve()
  );
}

// ------------------------------
const ids = [1, 2, 3, 4, 5, 6, 7];

// 批量请求函数，注意是 delay 执行的『函数』对了，否则会立即将请求发送出去，达不到串行的目的
const httpGetters = ids.map((id) => () =>
  httpGet(`https://jsonplaceholder.typicode.com/posts/${id}`)
);

// 分段串行，段中并行
schedulePromises(httpGetters, 3).then((resps) => {
  console.log('resps:', resps);
});
