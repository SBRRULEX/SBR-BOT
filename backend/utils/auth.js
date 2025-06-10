const fs = require("fs");
const axios = require("axios");
const puppeteer = require("puppeteer");

async function getFBSessionFromToken(token) {
  try {
    const res = await axios.get(`https://graph.facebook.com/me?access_token=${token}`);
    if (res.data && res.data.id) {
      return { success: true, uid: res.data.id, token };
    } else {
      return { success: false, error: "Invalid Token" };
    }
  } catch (err) {
    return { success: false, error: "Token Login Failed" };
  }
}

async function getFBSessionFromAppState(appStateJson) {
  try {
    const appState = JSON.parse(appStateJson);
    if (Array.isArray(appState)) {
      const c_user = appState.find(c => c.key === 'c_user');
      if (c_user) {
        return { success: true, uid: c_user.value, appState };
      }
    }
    return { success: false, error: "Invalid AppState" };
  } catch (err) {
    return { success: false, error: "AppState parsing failed" };
  }
}

async function getFBSessionFromCredentials(email, password, otpCode = "") {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto("https://mbasic.facebook.com/login");

    await page.type('input[name="email"]', email);
    await page.type('input[name="pass"]', password);
    await Promise.all([
      page.click('button[name="login"]'),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);

    if (page.url().includes("checkpoint")) {
      if (otpCode) {
        await page.type('input[name="approvals_code"]', otpCode);
        await Promise.all([
          page.click('button[type="submit"]'),
          page.waitForNavigation({ waitUntil: "networkidle2" }),
        ]);

        await page.click('button[type="submit"]');
        await page.waitForNavigation({ waitUntil: "networkidle2" });
      } else {
        await browser.close();
        return { success: false, error: "2FA required" };
      }
    }

    const cookies = await page.cookies();
    const appState = cookies.map(cookie => ({
      key: cookie.name,
      value: cookie.value,
      domain: cookie.domain,
      path: cookie.path,
      expires: cookie.expires,
      httpOnly: cookie.httpOnly,
      secure: cookie.secure
    }));

    const c_user = appState.find(c => c.key === 'c_user');
    await browser.close();

    if (c_user) {
      return { success: true, uid: c_user.value, appState };
    } else {
      return { success: false, error: "Login Failed" };
    }
  } catch (err) {
    return { success: false, error: "Puppeteer Error" };
  }
}

module.exports = {
  getFBSessionFromToken,
  getFBSessionFromAppState,
  getFBSessionFromCredentials,
};
