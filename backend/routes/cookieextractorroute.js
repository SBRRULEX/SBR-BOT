const express = require("express");
const router = express.Router();
const puppeteer = require("puppeteer");

router.post("/", async (req, res) => {
  const { email, password, code } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  try {
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });

    const page = await browser.newPage();
    await page.goto("https://www.facebook.com/login", { waitUntil: "networkidle2" });

    await page.type("#email", email);
    await page.type("#pass", password);
    await page.click("button[name='login']");
    await page.waitForTimeout(5000);

    if (await page.$("input[name='approvals_code']")) {
      if (!code) {
        await browser.close();
        return res.status(403).json({ error: "2FA code required" });
      }
      await page.type("input[name='approvals_code']", code);
      await page.click("button[name='submit[Continue]']");
      await page.waitForTimeout(5000);
    }

    const cookies = await page.cookies();
    await browser.close();

    const appState = cookies.map(({ name, value, domain, path, expires, httpOnly, secure }) => ({
      key: name,
      value,
      domain,
      path,
      expires,
      httpOnly,
      secure,
    }));

    res.json({ success: true, appState });
  } catch (err) {
    console.error("Extractor error:", err);
    res.status(500).json({ error: "Login or scraping failed" });
  }
});

module.exports = router;
