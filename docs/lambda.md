# Lambda

Everything runs cheaper on AWS lambda.

`yarn global add serverless`

`serverless deploy`

Then, go to the dashboard for the newly deployed Lambda function and add the following ENV variables:

```toml
TWILIO_ACCOUNT_SID=#Fill in
TWILIO_AUTH_TOKEN=#Fill in
```