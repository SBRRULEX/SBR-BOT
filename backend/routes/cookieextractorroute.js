const express = require("express");
const router = express.Router();
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

router.post("/extract-cookies", async (req, res) => {
  const { email, password, twofa } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const scriptPath = path.join(__dirname, "../../../cookie-extractor/getcookies_secure.js");

  const cmd = `node ${scriptPath} "${email}" "${password}" "${twofa || ""}"`;

  exec(cmd, { timeout: 60000 }, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Extractor error:", error.message);
      return res.status(500).json({ error: "Failed to extract cookies" });
    }

    const outputPath = path.join(__dirname, "../../../cookie-extractor/appstate.json");
    if (fs.existsSync(outputPath)) {
      const data = fs.readFileSync(outputPath, "utf-8");
      res.setHeader("Content-Disposition", "attachment; filename=appstate.json");
      res.setHeader("Content-Type", "application/json");
      return res.send(data);
    } else {
      return res.status(500).json({ error: "Cookie extraction failed or file not found" });
    }
  });
});

module.exports = router;
