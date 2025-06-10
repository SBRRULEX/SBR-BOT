const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

const delay = ms => new Promise(res => setTimeout(res, ms));

async function sendMessages({
  uidList,
  messages,
  auth,
  customDelay,
  prefix,
  sendLog
}) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 400, height: 800 });

  try {
    // LOGIN
    if (auth.token) {
      // Token-based login (can be extended)
      await page.goto(`https://m.facebook.com/composer/ocelot/async_loader/?publisher=feed`, { waitUntil: "networkidle2" });
      await page.evaluate(token => {
        localStorage.setItem("accessToken", token);
      }, auth.token);
    } else if (auth.appstate) {
      const cookies = auth.appstate;
      await page.setCookie(...cookies);
      await page.goto("https://m.facebook.com", { waitUntil: "networkidle2" });
    } else if (auth.email && auth.password) {
      await page.goto("https://m.facebook.com/login", { waitUntil: "networkidle2" });
      await page.type("#m_login_email", auth.email);
      await page.type("#m_login_password", auth.password);
      await Promise.all([
        page.click("button[name='login']"),
        page.waitForNavigation({ waitUntil: "networkidle2" })
      ]);
    }

    sendLog("✅ Logged in successfully.");

    // LOOP THROUGH EACH UID
    for (let uid of uidList) {
      for (let msg of messages) {
        const finalMessage = prefix + " " + msg;
        const chatUrl = `https://m.facebook.com/messages/thread/${uid}`;
        await page.goto(chatUrl, { waitUntil: "domcontentloaded" });

        await page.waitForSelector("textarea[name='body']");
        await page.type("textarea[name='body']", finalMessage);

        await Promise.all([
          page.click("button[type='submit']"),
          page.waitForTimeout(1000)
        ]);

        const time = new Date().toLocaleTimeString();
        sendLog(`📤 [${time}] SBR SUCCESSFULLY SEND to ${uid}: ${msg}`);

        await delay(customDelay);
      }
    }

    await browser.close();
  } catch (err) {
    sendLog(`❌ Error sending messages: ${err.message}`);
    await browser.close();
  }
}

module.exports = { sendMessages };
