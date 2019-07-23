const puppeteer = require('puppeteer');

describe('Gast User - Standardansicht', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage()
    await page.goto('http://staging-van-ham.auctionng.de/live_bid_panel/index.php?language=de', { waitUntil: 'networkidle2' });
  });

  it('sollte den Seitentitel "A:NG - Live Bidding 3.0 Beta 2" enthalten', async () => {
    await expect(page.title()).resolves.toBe('A:NG - Live Bidding 3.0 Beta 2');
  });

  it('sollte den Login Button "Einloggen zur Teilnahme" enthalten', async () => {
    const loginBtnText = await page.$eval('#login_area a', e => e.innerText);
    await expect(loginBtnText).toBe('Einloggen zur Teilnahme')
  });

  it('klick auf Login Button sollte die Login Page /login.html öffnen', async () => {
    await Promise.all([
      page.evaluate(() => document.querySelector('#login_area a').click()),
      browser.waitForTarget(target => target.url() === 'http://staging-van-ham.auctionng.de/login.html?login_from_live_bid=1'),
    ])
  });
});