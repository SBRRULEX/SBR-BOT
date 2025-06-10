const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');

const prompt = (query) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => rl.question(query, ans => {
    rl.close();
    resolve(ans);
  }));
};

(async () => {
  const email = await prompt('Enter Facebook Email: ');
  const password = await prompt('Enter Facebook Password: ');

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://www.facebook.com/login', { waitUntil: 'networkidle2' });

  await page.type('#email', email, { delay: 50 });
  await page.type('#pass', password, { delay: 50 });
  await Promise.all([
    page.click('[type=submit]'),
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);

  // 2FA Handling
  if (page.url().includes('checkpoint')) {
    console.log('2FA detected. Please enter your 2FA code manually in browser window...');
    await page.waitForSelector('input[name=approvals_code]', { timeout: 60000 });
    const code = await prompt('Enter 2FA Code: ');
    await page.type('input[name=approvals_code]', code);
    await Promise.all([
      page.click('#checkpointSubmitButton'),
      page.waitForNavigation({ waitUntil: 'networkidle2' })
    ]);

    // Confirm device
    try {
      await page.click('#checkpointSubmitButton');
      await page.waitForNavigation({ waitUntil: 'networkidle2' });
    } catch {}
  }

  const cookies = await page.cookies();
  const appState = cookies.map(cookie => ({
    key: cookie.name,
    value: cookie.value,
    domain: cookie.domain,
    path: cookie.path,
    hostOnly: cookie.hostOnly,
    creation: cookie.session ? null : cookie.expires,
    secure: cookie.secure,
    httpOnly: cookie.httpOnly
  }));

  fs.writeFileSync('appstate.json', JSON.stringify(appState, null, 2));
  console.log('✅ appstate.json saved successfully!');
  await browser.close();
})();
