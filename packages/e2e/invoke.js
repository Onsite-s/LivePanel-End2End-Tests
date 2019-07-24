const AWS = require('aws-sdk')
AWS.config.region = 'eu-central-1'
const lambda = new AWS.Lambda()

invokeE2E()

function invokeE2E() {
  const params = {
    FunctionName: 'e2e-puppeteer-function',
    InvocationType: 'RequestResponse',
    LogType: 'Tail',
    Payload: JSON.stringify({})
  }

  lambda.invoke(params, function (err, data) {
    if (err) return console.error(err)

    console.log(data.Payload)
  })
}