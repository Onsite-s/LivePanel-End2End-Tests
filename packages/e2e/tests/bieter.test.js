const username = process.env.USERNAME_BID
const password = process.env.PASSWORD_BID
const baseUrl = process.env.BASE_URL

describe('Bieter User - Standardansicht', () => {
  beforeAll(async () => {
    jest.setTimeout(20000)
    await page.goto(`${baseUrl}/login.html`, { waitUntil: 'networkidle2' })
  })

  afterAll(async () => {
    await page.goto(`${baseUrl}/logout.html`, { waitUntil: 'networkidle2' })
  })

  test('Benutzername "sk@onsite.org" mit gültigem Passwort sollte sich anmelden können und auf der /my_activity.html geleitet werden', async () => {
    const usernameInput = await page.$('#login_email')
    await usernameInput.type(username)
    const passwordInput = await page.$('#login_password')
    await passwordInput.type(password)

    await Promise.all([
      page.evaluate(() => document.querySelector('#action').click()),
      browser.waitForTarget(target => target.url() === `${baseUrl}/my_activity.html`),
    ])

    await page.goto(`${baseUrl}/live_bid_panel/index.php?language=de`, { waitUntil: 'networkidle2' });

    await page.evaluate(() => document.querySelector('#save_inet_bid').click());
  })
})