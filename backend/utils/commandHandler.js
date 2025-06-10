const fs = require("fs");
const path = require("path");
const { sendMedia, sendText } = require("./fbMessenger");

const commands = {
  "+help": async ({ send }) => {
    const msg = `🧠 *Available Commands:*
+hornymode <keyword>
+blackedraw <performer name>
+owner
+id
+help`;
    sendText(send, msg);
  },

  "+owner": async ({ send }) => {
    sendText(send, "👑 Owner: Rocky SBR\n📞 Contact: @rockysbr");
  },

  "+id": async ({ senderID, send }) => {
    sendText(send, `🔎 Your Facebook ID: ${senderID}`);
  },

  "+hornymode": async ({ message, send }) => {
    const keyword = message.split(" ").slice(1).join(" ").toLowerCase();
    const basePath = path.join(__dirname, "..", "assets", "hornymode");

    if (!keyword) {
      const defaultPath = path.join(basePath, "random", "any1.mp4");
      return sendMedia(send, defaultPath, "🎬 Enjoy Random Hot Clip");
    }

    const dirPath = path.join(basePath, keyword.replace(/\s/g, "_"));
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath).filter(f => f.endsWith(".mp4"));
      if (files.length > 0) {
        const selected = path.join(dirPath, files[Math.floor(Math.random() * files.length)]);
        return sendMedia(send, selected, `🔥 Hot: ${keyword}`);
      }
    }

    sendText(send, "❌ No clips found for this keyword.");
  },

  "+blackedraw": async ({ message, send }) => {
    const name = message.split(" ").slice(1).join(" ").toLowerCase();
    const basePath = path.join(__dirname, "..", "assets", "blackedraw");

    if (!name) {
      const files = fs.readdirSync(basePath).filter(f => f.endsWith(".mp4"));
      const selected = files[Math.floor(Math.random() * files.length)];
      return sendMedia(send, path.join(basePath, selected), "🎬 Random BlackedRaw Clip");
    }

    const folder = path.join(basePath, name.replace(/\s/g, "_"));
    if (fs.existsSync(folder)) {
      const files = fs.readdirSync(folder).filter(f => f.endsWith(".mp4"));
      if (files.length > 0) {
        const selected = path.join(folder, files[Math.floor(Math.random() * files.length)]);
        return sendMedia(send, selected, `🎥 Performer: ${name}`);
      }
    }

    sendText(send, "❌ No performer found.");
  }
};

async function handleCommand({ message, senderID, send }) {
  const prefix = "+";
  if (!message.startsWith(prefix)) return;

  const cmd = message.split(" ")[0].toLowerCase();
  if (commands[cmd]) {
    await commands[cmd]({ message, senderID, send });
  } else {
    sendText(send, "❌ Unknown command. Use `+help` to see available options.");
  }
}

module.exports = {
  handleCommand,
};
