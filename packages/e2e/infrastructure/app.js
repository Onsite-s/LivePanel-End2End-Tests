const dotenv = require('dotenv')
console.log(dotenv.config().parsed)
const { App } = require('@aws-cdk/core')
const WebApi = require('./stack')

const app = new App()

new WebApi(app, 'E2E-Puppeteer', {
  ...dotenv.config().parsed,
})

app.synth()