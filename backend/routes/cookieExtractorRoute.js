const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.post("/extract-cookies", async (req, res) => {
  const { email, password, twofa } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "⚠️ Email and Password are required." });
  }

  // Save credentials temporarily
  const credsPath = path.join(__dirname, "../../cookie-extractor/temp-creds.json");
  fs.writeFileSync(credsPath, JSON.stringify({ email, password, twofa: twofa || "" }));

  const extractorScriptPath = path.join(__dirname, "../../cookie-extractor/getcookies_secure.js");

  // Run the extractor script with Puppeteer
  exec(`node "${extractorScriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Extraction error:", stderr || error.message);
      return res.status(500).json({ error: "❌ Failed to extract cookies. Check credentials or 2FA." });
    }

    const resultFile = path.join(__dirname, "../../cookie-extractor/appstate.json");

    if (!fs.existsSync(resultFile)) {
      return res.status(500).json({ error: "❌ Appstate not generated." });
    }

    const appstate = fs.readFileSync(resultFile, "utf-8");

    // Clean up
    fs.unlinkSync(resultFile);
    fs.unlinkSync(credsPath);

    res.json({ message: "✅ Cookie extraction successful.", appstate: JSON.parse(appstate) });
  });
});

module.exports = router;
