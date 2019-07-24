const { join } = require('path')
const {
  Stack,
  Duration
} = require('@aws-cdk/core')

const { Function, Runtime, Code } = require('@aws-cdk/aws-lambda')

module.exports = class E2EPuppeteer extends Stack {
  constructor(parent, id, props) {
    super(parent, id, props)

    const { baseUrl, usernameBid, passwordBid, } = props

    const lambda = new Function(this, 'E2EPuppeteerFunction', {
      functionName: 'e2e-puppeteer-function',
      runtime: Runtime.NODEJS_8_10,
      handler: 'runner.run',
      timeout: Duration.seconds(300),
      memorySize: 1600,
      code: Code.asset(join(__dirname, '../build')),
      environment: {
        BASE_URL: baseUrl,
        USERNAME_BID: usernameBid,
        PASSWORD_BID: passwordBid
      },
    })
  }
}