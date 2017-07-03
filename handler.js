if (!global._babelPolyfill) require('babel-polyfill');

import axios from 'axios';

module.exports.wakeup = (event, context, callback) => {
  console.log('Calling Wakeup Lambda.');

  const wakeupOptions = {
    nj2jp: {
      endpoint: process.env.NJ2JP_WAKEUP,
      option: {
        query: 'query{FindProductById(_id: \"Test\") {_id, product { mainTitle title flavor price sku sizes nicotine_strengths routeTag vendor blurb images{ purpose url } dates {added_to_store  removed_from_store }}}}',
      },
    },
    lonesmoke: {
      endpoint: process.env.LONESMOKE_WAKEUP,
      option: {
        userEmail: 'wakeup@stackinet.com',
      },
    },
  };

  const asyncConcurrentWakeup = async (wakeupObj) => {
    const keys = Object.keys(wakeupObj);

    const callLambda = async (endpoint, options) => await axios.post(endpoint, options);

    const results = await Promise.all([
      callLambda(wakeupObj[keys[0]].endpoint, wakeupObj[keys[0]].option),
      callLambda(wakeupObj[keys[1]].endpoint, wakeupObj[keys[1]].option),
    ])
    .catch((error) => {
      console.error('ERROR: \n', error);
      callback(null, error);
    });
    results.forEach(({ status, config: { url } }, i) => {
      console.log(`
        REQUEST #${i + 1}:
        URL: ${url}
        RESPONSE: ${status}
      `);
    });
  }

  const result = asyncConcurrentWakeup(wakeupOptions);
  callback(null, result);
}
