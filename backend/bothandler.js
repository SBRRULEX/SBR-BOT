const fs = require("fs");
const path = require("path");
const readline = require("readline");

const logWithStyle = (msg) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] 🌟 SBR SUCCESSFULLY SEND: ${msg}`);
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Main handler
const handleBotCommands = async ({ tokenPath, uidPath, messagePath, delayTime = 3000 }) => {
  try {
    const token = fs.readFileSync(tokenPath, "utf-8").trim();
    const uids = fs.readFileSync(uidPath, "utf-8").split("\n").filter(Boolean);
    const messages = fs.readFileSync(messagePath, "utf-8").split("\n").filter(Boolean);

    for (const uid of uids) {
      for (const message of messages) {
        // Yahan Facebook sendMessage function ko call karo
        logWithStyle(`To ${uid}: ${message}`);
        await delay(delayTime);
      }
    }

    console.log("🎯 All messages sent successfully.");
  } catch (err) {
    console.error("❌ Error in handleBotCommands:", err.message);
  }
};

module.exports = handleBotCommands;
