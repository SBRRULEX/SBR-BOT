const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const {
  startMessageFlow,
  stopMessageFlow,
  getStopCode,
} = require("./core/messageController");
const { getSessionFromAppState, getSessionFromToken } = require("./core/sessionLoader");

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer({ dest: "uploads/" });

let activeSession = null;
let currentStopCode = null;

app.post("/start", upload.fields([
  { name: "appstate", maxCount: 1 },
  { name: "token", maxCount: 1 },
  { name: "uids", maxCount: 1 },
  { name: "messages", maxCount: 1 }
]), async (req, res) => {
  try {
    const { delay, prefix } = req.body;

    // Load session
    if (req.files.appstate) {
      const appstatePath = req.files.appstate[0].path;
      const data = JSON.parse(fs.readFileSync(appstatePath, "utf-8"));
      activeSession = await getSessionFromAppState(data);
      fs.unlinkSync(appstatePath);
    } else if (req.files.token) {
      const tokenPath = req.files.token[0].path;
      const token = fs.readFileSync(tokenPath, "utf-8").trim();
      activeSession = await getSessionFromToken(token);
      fs.unlinkSync(tokenPath);
    } else {
      return res.status(400).send("⚠️ No login method provided.");
    }

    if (!activeSession) {
      return res.status(500).send("❌ Failed to establish session.");
    }

    // Load UIDs
    const uidFile = req.files.uids[0].path;
    const uids = fs.readFileSync(uidFile, "utf-8").split(/\r?\n/).filter(Boolean);
    fs.unlinkSync(uidFile);

    // Load Messages
    const msgFile = req.files.messages[0].path;
    const messages = fs.readFileSync(msgFile, "utf-8").split(/\r?\n/).filter(Boolean);
    fs.unlinkSync(msgFile);

    // Start message flow
    startMessageFlow({
      session: activeSession,
      uids,
      messages,
      delay: parseInt(delay) || 3000,
      prefix: prefix || "",
      logCallback: (msg) => console.log(msg)
    });

    currentStopCode = getStopCode();
    res.send(`✅ Started! Stop code: ${currentStopCode}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("❌ Failed to start.");
  }
});

app.post("/stop", (req, res) => {
  stopMessageFlow();
  res.send("🛑 Stopped by user.");
});

app.get("/stop-code", (req, res) => {
  const code = getStopCode();
  res.send({ stopCode: code });
});

app.listen(3000, () => {
  console.log("🚀 SBR-BOT backend running on port 3000");
});
