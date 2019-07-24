const baseUrl = process.env.BASE_URL || 'http://staging-van-ham.auctionng.de'

describe('Gast User - Standardansicht', () => {
  beforeAll(async () => {
    jest.setTimeout(20000)
    await page.goto(`${baseUrl}/live_bid_panel/index.php?language=de`, { waitUntil: 'networkidle2' })
  })

  test('sollte den Seitentitel "A:NG - Live Bidding 3.0 Beta 2" enthalten', async () => {
    await expect(page.title()).resolves.toBe('A:NG - Live Bidding 3.0 Beta 2')
  })

  test('sollte den Login Button "Einloggen zur Teilnahme" enthalten', async () => {
    const loginBtnText = await page.$eval('#login_area a', e => e.innerText)
    await expect(loginBtnText).toBe('Einloggen zur Teilnahme')
  })

  test('klick auf Login Button sollte die Login Page /login.html öffnen', async () => {
    await Promise.all([
      page.evaluate(() => document.querySelector('#login_area a').click()),
      browser.waitForTarget(target => target.url() === `${baseUrl}/login.html?login_from_live_bid=1`),
    ])
  })
})