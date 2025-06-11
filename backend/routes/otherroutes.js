const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Health Check
router.get("/health", (req, res) => {
  res.json({ status: "✅ Server is healthy" });
});

// Upload Token or Appstate
router.post("/upload-auth", (req, res) => {
  const { method, data } = req.body;
  if (!method || !data) return res.status(400).json({ error: "Missing auth method or data" });

  const filename = method === "token" ? "token.txt" : "appstate.json";
  const filepath = path.join(__dirname, "..", "auth", filename);

  fs.writeFile(filepath, method === "token" ? data : JSON.stringify(data, null, 2), err => {
    if (err) return res.status(500).json({ error: "Failed to save auth file" });
    res.json({ success: true, savedAs: filename });
  });
});

// Upload Message or UID
router.post("/upload-file", (req, res) => {
  const { name, content } = req.body;
  if (!name || !content) return res.status(400).json({ error: "Missing name or content" });

  const filepath = path.join(__dirname, "..", "uploads", name);
  fs.writeFile(filepath, content, err => {
    if (err) return res.status(500).json({ error: "Failed to upload file" });
    res.json({ success: true, uploaded: name });
  });
});

module.exports = router;
