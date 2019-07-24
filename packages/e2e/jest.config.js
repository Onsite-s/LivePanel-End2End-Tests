require('module-alias/register')

module.exports = {
  verbose: true,
  preset: 'jest-puppeteer',
  testEnvironment: 'jest-environment-puppeteer',
}