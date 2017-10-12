if (!global._babelPolyfill) require('babel-polyfill');

import { Promise as bbPromise } from 'bluebird';
import AWS from 'aws-sdk';

const lambda = new AWS.Lambda({
    region: 'ap-northeast-1'
});

module.exports.wakeup = (event, context, callback) => {
  console.log('Calling Wakeup Lambda.');

  const wakeupOptions = {
    nj2jp: {
      functionName: process.env.NJ2JP_WAKEUP,
      payload: '{ "body" : {"query":"query{PopularProducts(qty: 6) {_id, docId, slug, images {purpose url}, title{en ja}, completedCheckouts}}"}}',
    },
    lonesmoke: {
      functionName: process.env.LONESMOKE_WAKEUP,
      payload: '{ "body" : {"userEmail":"wakeup@stakinet.com"}}',
    },
  };

  const asyncConcurrentWakeup = async (wakeupObj) => {
    const keys = Object.keys(wakeupObj);

    const callLambda = async (functionName, payload) => await bbPromise.fromCallback(cb => lambda.invoke({
       FunctionName: functionName,
       InvocationType: 'RequestResponse',
       Payload: payload
    }, cb));

    const results = await Promise.all([
      callLambda(wakeupObj[keys[0]].functionName, wakeupObj[keys[0]].payload),
      callLambda(wakeupObj[keys[1]].functionName, wakeupObj[keys[1]].payload),
    ])
    .catch((error) => {
      console.error('ERROR: \n', error);
      callback(error);
    });
    results.forEach(({ StatusCode }, i) => {
      console.log(`
        REQUEST #${i + 1}:
        RESPONSE: ${StatusCode}
      `);
    });
  }

  const result = asyncConcurrentWakeup(wakeupOptions);
  callback(null, result);
}
