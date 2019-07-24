const chromePaths = require('chrome-paths')

module.exports = {
  launch: {
    headless: false,
    slowMo: 0,
    devtools: true,
    timeout: 0,
    executablePath: chromePaths.chrome,
  }
}