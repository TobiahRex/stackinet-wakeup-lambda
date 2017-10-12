# Stackinet-Wakeup-Lambda
One of the drawbacks of AWS Lambda is the **cold start**. The solution to this is to have an wakeup Lambda. This repo is an example of wakeup Lambda that wakes up other Lambdas.

## Technical Architecture
This is the high level architecture of **NJ2JP**, an e-commerce application. This application is completely powered by AWS Lambda. You can see, there is a **wake-up Lambda** next to **main lambda** in the private subnet.
![NJ2JP Architecture diagram](https://raw.githubusercontent.com/lakshmantgld/stackinet-wakeup-lambda/master/readmeFiles/nj2jp-architecture.png)

#### Wake-Up Lambda
This is the specific architecture of the **wake-up Lambda**. You can see that the wake-up Lambda periodically warms up all other Lambdas.
![wake-up Architecture diagram](https://raw.githubusercontent.com/lakshmantgld/stackinet-wakeup-lambda/master/readmeFiles/wakeUpLambda.png)
