const chrome = require('chrome-aws-lambda');

const username = process.env.USERNAME_AUKTIONATOR;
const password = process.env.PASSWORD_AUKTIONATOR;
const baseUrl = process.env.BASE_URL;

describe.skip('Bieter User - Standardansicht', () => {
  let browser;
  let page;

  beforeAll(async () => {
    jest.setTimeout(20000);

    browser = await chrome.puppeteer.launch({
      args: chrome.args,
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: chrome.headless,
      slowMo: 0,
      devtools: true,
      timeout: 0,
    });
    page = await browser.newPage();

    await page.goto(`${baseUrl}/login.html`, { waitUntil: 'networkidle2' });
  });

  afterAll(async () => {
    await page.goto(`${baseUrl}/logout.html`, { waitUntil: 'networkidle2' });
  });

  test(`Benutzername ${username} mit gültigem Passwort sollte sich anmelden können und auf der /my_activity.html geleitet werden`, async () => {
    const usernameInput = await page.$('#login_email');
    await usernameInput.type(username);
    const passwordInput = await page.$('#login_password');
    await passwordInput.type(password);

    await Promise.all([
      page.evaluate(() => document.querySelector('#action').click()),
      browser.waitForTarget(target => target.url() === `${baseUrl}/my_activity.html`),
    ]);

    await page.goto(`${baseUrl}/live_bid_panel/index.php?language=de`, { waitUntil: 'networkidle2' });
    await page.evaluate(() => document.querySelector('#save_hall_bid').click());
    await delay(3000);
    await page.evaluate(() => document.querySelector('#save_hall_bid').click());
    await delay(3000);
    await page.evaluate(() => document.querySelector('#save_hall_bid').click());
    await delay(3000);
    await page.goto('about:blank');
    await delay(3000);
  });
});

function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), timeout);
  });
}
