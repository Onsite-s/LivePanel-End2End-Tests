describe('Bieter User - Standardansicht', () => {
  beforeAll(async () => {
    await page.goto('http://staging-van-ham.auctionng.de/login.html', { waitUntil: 'networkidle2' })
  })

  afterAll(async () => {
    await page.goto('http://staging-van-ham.auctionng.de/logout.html', { waitUntil: 'networkidle2' })
  })
  it('Benutzername "sk@onsite.org" mit gültigem Passwort sollte sich anmelden können und auf der /my_activity.html geleitet werden', async () => {
    const usernameInput = await page.$('#login_email')
    await usernameInput.type('sk@onsite.org')
    const passwordInput = await page.$('#login_password')
    await passwordInput.type('0CDKmROs')

    await Promise.all([
      page.evaluate(() => document.querySelector('#action').click()),
      browser.waitForTarget(target => target.url() === 'http://staging-van-ham.auctionng.de/my_activity.html'),
    ])

    await page.goto('http://staging-van-ham.auctionng.de/live_bid_panel/index.php?language=de', { waitUntil: 'networkidle2' });

    await page.evaluate(() => document.querySelector('#save_inet_bid').click());
  })
})