const { App } = require('@aws-cdk/core')
const WebApi = require('./stack')

const app = new App()

new WebApi(app, 'E2E-Puppeteer', {
  baseUrl: process.env.BASE_URL,
  usernameBid: process.env.USERNAME_BID,
  passwordBid: process.env.PASSWORD_BID,
})

app.synth()