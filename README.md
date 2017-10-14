# Stackinet-Wakeup-Lambda
One of the drawbacks of AWS Lambda is the **cold start**. The solution to this is to have an wakeup Lambda. This repo is an example of wakeup Lambda that wakes up other Lambdas.

## Technical Architecture
This is the high level architecture of **NJ2JP**, an e-commerce application. This application is completely powered by AWS Lambda. You can see, there is a **wake-up Lambda** next to **main lambda** in the private subnet.
![NJ2JP Architecture diagram](https://raw.githubusercontent.com/lakshmantgld/stackinet-wakeup-lambda/master/readmeFiles/nj2jp-architecture.png)

#### Wake-Up Lambda
This is the specific architecture of the **wake-up Lambda**. You can see that the wake-up Lambda periodically warms up all other Lambdas.
![wake-up Architecture diagram](https://raw.githubusercontent.com/lakshmantgld/stackinet-wakeup-lambda/master/readmeFiles/wakeUpLambda.png)

### Instructions to deploy the Wake-Up Lambda:

1. Duplicate the `config.copy.yml` file and rename it as `config.yml`. Add your function names and make sure you refer those names in the `serverless.yml`.
2. Once you have added your function names to environment variables, add proper payload to those functions in the `handler.js`.
3. Deploy the wake-up lambda using `sls deploy` command.
4. This will deploy the wake-up Lambda and will invoke the lambda at the specified interval of time.
