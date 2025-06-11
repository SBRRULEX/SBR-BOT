const express = require("express");
const router = express.Router();

// Home route - backend running check
router.get("/", (req, res) => {
  res.status(200).send(`
    <div style="text-align:center; font-family:sans-serif; padding:30px;">
      <h1>🔥 Rocky SBR Bot Backend is Running</h1>
      <p>All systems operational ✅</p>
      <p>Cookie extractor, bot handler, and all routes working.</p>
      <small style="color:#888;">Powered by Rocky SBR on Render</small>
    </div>
  `);
});

// Health check route
router.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "Rocky SBR Backend" });
});

module.exports = router;
