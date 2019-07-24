const jest = require('jest');

module.exports = { run }

async function run() {
  await jest.run(['./tests']);
}