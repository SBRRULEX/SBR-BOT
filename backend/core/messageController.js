const fs = require("fs");
const path = require("path");
const { sendText, sendMedia, initMessenger } = require("../utils/fbMessenger");

let isRunning = false;
let stopCode = "";
let delay = 2000; // default 2 seconds

async function startMessaging({ auth, uidList, messages, customDelay, prefix, sendLog }) {
  if (isRunning) return sendLog("⚠️ Bot is already running...");

  const send = initMessenger(auth);
  isRunning = true;
  stopCode = Math.floor(100000 + Math.random() * 900000).toString();
  delay = customDelay || 2000;

  sendLog(`🚀 Bot started. Stop code: ${stopCode}`);

  for (const uid of uidList) {
    for (const msg of messages) {
      if (!isRunning) break;

      if (msg.startsWith(prefix)) {
        await handleCommand(msg, uid, send, sendLog);
      } else {
        await sendText(send, `[UID: ${uid}] ${msg}`);
        sendLog(`✅ Sent to ${uid} at ${new Date().toLocaleTimeString()}`);
      }

      await new Promise(res => setTimeout(res, delay));
    }
  }

  sendLog("✅ Messaging complete.");
}

async function handleCommand(msg, uid, send, sendLog) {
  const cmd = msg.trim().toLowerCase();

  if (cmd.startsWith("+hornymode")) {
    const keyword = cmd.replace("+hornymode", "").trim() || "any";
    const filePath = `assets/hornymode/${keyword}/hot1.mp4`;
    await sendMedia(send, filePath, `[HornyMode] ${keyword}`);
    sendLog(`🔥 Sent hornymode clip for "${keyword}"`);
  }

  else if (cmd.startsWith("+blackedraw")) {
    const performer = cmd.replace("+blackedraw", "").trim();
    const filePath = performer
      ? `assets/blackedraw/${performer}/scene1.mp4`
      : `assets/blackedraw/random/any1.mp4`;

    await sendMedia(send, filePath, performer ? performer : "BlackedRaw Random");
    sendLog(`🎬 Sent BlackedRaw content for "${performer || 'random'}"`);
  }

  else {
    await sendText(send, `[UID: ${uid}] ❌ Unknown command: ${cmd}`);
  }
}

function stopMessaging(sendLog) {
  isRunning = false;
  sendLog(`🛑 Bot stopped manually with code ${stopCode}`);
}

function validateStopCode(input) {
  return input === stopCode;
}

module.exports = {
  startMessaging,
  stopMessaging,
  validateStopCode
};
