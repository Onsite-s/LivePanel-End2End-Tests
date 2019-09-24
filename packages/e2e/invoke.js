const AWS = require('aws-sdk');
const lambda = new AWS.Lambda();
const [_, __, count = 1] = process.argv;

invokeE2E(parseInt(count));

async function invokeE2E(count) {
  const lambdaInvokeList = new Array(count).fill({}).map(() =>
    lambda
      .invoke({
        FunctionName: 'e2e-puppeteer-function',
        InvocationType: 'RequestResponse',
        LogType: 'Tail',
        Payload: JSON.stringify({}),
      })
      .promise()
      .catch(error => ({ LogResult: error.message, Payload: '{}' }))
  );

  try {
    const lambdaResults = await Promise.all(lambdaInvokeList);

    lambdaResults.forEach(({ LogResult, Payload }) => {
      if (LogResult.includes('Function not found:')) return console.log(LogResult);

      const logResults = Buffer.from(LogResult, 'base64').toString('ascii');
      const { results: { success, numFailedTests, numPassedTests, numPendingTests, testResults } = {} } = JSON.parse(
        Payload
      );
      console.log(logResults);
      console.log('Erfolgreiche Ausführung aller Tests: ', success);
      console.log('Erfolgreiche Tests: ', numPassedTests);
      console.log('Nicht erfolgreiche Tests: ', numFailedTests);
      console.log('Ausgesetzte Tests: ', numPendingTests);
      console.log('Fehlermeldungen:');
      testResults.forEach(x => {
        console.log('Pfad:', x.testFilePath);
        console.log('Fehler:', x.failureMessage);
      });
    });
  } catch (error) {
    console.error(error);
  }
}
