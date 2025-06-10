const express = require("express");
const router = express.Router();
const {
  generateStopCode,
  getStopCode,
  shouldStop,
  sendMessages
} = require("../sendMessage");

let currentApi = null;

router.post("/set-api", (req, res) => {
  currentApi = req.body.api;
  res.send("✅ API Session Set");
});

router.get("/generate-stop-code", (req, res) => {
  const code = generateStopCode();
  res.json({ code });
});

router.post("/send", (req, res) => {
  const { uidList, messageList, delay } = req.body;
  if (!currentApi) return res.status(400).send("API not set");

  sendMessages(currentApi, uidList, messageList, delay, console.log, (msg) => {
    console.log(msg);
  });

  res.send("Sending Started");
});

router.post("/stop", (req, res) => {
  currentApi = null;
  res.send("✅ Stopped");
});

module.exports = router;
