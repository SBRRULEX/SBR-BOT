const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

async function sendText(send, message) {
  try {
    await send({ type: "text", content: message });
  } catch (err) {
    console.error("❌ Failed to send text:", err.message);
  }
}

async function sendMedia(send, filePath, caption = "") {
  try {
    const absolutePath = path.resolve(filePath);
    if (!fs.existsSync(absolutePath)) {
      return await sendText(send, "❌ Media file not found.");
    }

    await send({
      type: "media",
      filePath: absolutePath,
      caption,
    });
  } catch (err) {
    console.error("❌ Failed to send media:", err.message);
    await sendText(send, "❌ Failed to send media.");
  }
}

function initMessenger(authMethod) {
  // This function will return a `send` method which can be used by commandHandler
  return async function send({ type, content, filePath, caption }) {
    if (type === "text") {
      console.log("📤 Sending message:", content);
      // integrate fbchat or puppeteer to send message here
    } else if (type === "media") {
      console.log("📤 Sending media:", filePath, "| Caption:", caption);
      // use puppeteer to upload/send file in FB messenger
    }
  };
}

module.exports = {
  sendText,
  sendMedia,
  initMessenger
};
