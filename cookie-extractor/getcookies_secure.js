const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const fs = require("fs");

puppeteer.use(StealthPlugin());

async function extractCookies({ email, password, otpCallback }) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();

  await page.goto("https://www.facebook.com/login", { waitUntil: "networkidle2" });

  await page.type("#email", email);
  await page.type("#pass", password);
  await page.click("[name=login]");
  await page.waitForTimeout(5000);

  if (await page.$("input[name='approvals_code']")) {
    const otpInput = await otpCallback();
    await page.type("input[name='approvals_code']", otpInput);
    await page.click("#checkpointSubmitButton");
    await page.waitForTimeout(5000);
  }

  const cookies = await page.cookies();
  await browser.close();
  return cookies;
}

module.exports = { extractCookies };
