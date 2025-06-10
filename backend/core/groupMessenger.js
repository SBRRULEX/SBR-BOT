// backend/core/groupMessenger.js

const sendMessage = require("../utils/sendMessage"); const { getCurrentTimestamp } = require("../utils/timestamp"); const { readFileSync } = require("fs"); const path = require("path");

async function sendGroupMessages(session, uidListPath, messageListPath, delay, stopCode, logCallback) { try { const uidList = readFileSync(uidListPath, "utf-8").split("\n").filter(Boolean); const messageList = readFileSync(messageListPath, "utf-8").split("\n").filter(Boolean);

logCallback(`📤 Starting group message sending to ${uidList.length} groups...`);

for (let i = 0; i < uidList.length; i++) {
  const groupId = uidList[i];
  const message = messageList[i % messageList.length];

  const timestamp = getCurrentTimestamp();
  await sendMessage(session, groupId, message);

  logCallback(`[${timestamp}] ✅ SBR SUCCESSFULLY SEND to group ${groupId}`);

  if (global.SBR_STOP_CODE === stopCode) {
    logCallback("⛔ Stop code matched. Halting group messages.");
    break;
  }

  await new Promise(res => setTimeout(res, delay));
}

logCallback("✅ Group message sending finished.");

} catch (error) { logCallback("❌ Error sending group messages: " + error.message);

