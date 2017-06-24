import axios from 'axios';

module.exports.wakeup = (event, context, callback) => {
  console.log('Calling Wakeup Lambda.');

  const wakeupOptions = {
    nj2jp: {
      endpoint: process.env.NJ2JP_URL,
      options: {
        query: 'query{FindProductById(_id: \"Test\") {_id, product { mainTitle title flavor price sku sizes nicotine_strengths routeTag vendor blurb images{ purpose url } dates {added_to_store  removed_from_store }}}}',
      }
    },
    lonesmoke: {
      endpoint: process.env.LONESMOKE_URL,
      option: {
        userEmail: 'test@test.test',
      }
    }
  };

  const asyncRequest = async (wakeupObj) =>
  new Promise((resolve, reject) => {
    const keys = Object.keys(wakeupObj);

    const callLambda = async(endpoint, options) =>
    await axios.post(endpoint, options);

    const results = await Promise.all([
      callLambda(wakeupObj[keys[0]].endpoint, wakeupObj[keys[0].option]),
      callLambda(wakeupObj[keys[1]].endpoint, wakeupObj[keys[1].option]),
    ])
    .catch((error) => {
      console.error('ERROR: \n', error);
      callback(null, error);
    });

    results.forEach((res) => console.log(`
      SUCCESS RESULTS:
      ${JSON.stringify(res, null, 2)}
      `));

  });

  asyncRequest(wakeupOptions)
  .then(() => callback(null, { message: 'Successfully executed wakeup.' }))
  .catch(callback(null, error));
}
