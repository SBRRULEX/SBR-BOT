const fs = require("fs");
const path = require("path");

// Load command files if available
const getFileContent = (filename) => {
  try {
    const filePath = path.join(__dirname, "uploads", filename);
    return fs.readFileSync(filePath, "utf-8").split("\n").filter(Boolean);
  } catch (err) {
    return [];
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function handleBotCommands(page, options = {}) {
  const { delay = 3000, stopCode, prefix = "+" } = options;
  const uids = getFileContent("uid.txt");
  const messages = getFileContent("message.txt");

  if (!uids.length || !messages.length) {
    console.log("❌ UID or Message list empty.");
    return;
  }

  let stopped = false;
  const randomStopCode = stopCode || Math.random().toString().slice(2, 8);

  console.log(`🟢 Bot started. Stop Code: ${randomStopCode}`);

  for (const uid of uids) {
    if (stopped) break;

    await page.goto(`https://www.facebook.com/messages/t/${uid}`, { waitUntil: "networkidle2" });
    await sleep(2000);

    let message = messages[Math.floor(Math.random() * messages.length)];

    // Handle custom prefix commands
    if (message.startsWith(`${prefix}blackedraw`)) {
      const performer = message.split(" ").slice(1).join(" ");
      message = performer
        ? `Sending clip of ${performer} 🔥 (20s+)`
        : "🔥 Random BlackedRaw clip incoming...";
    }

    if (message.startsWith(`${prefix}hornymode`)) {
      const keyword = message.split(" ").slice(1).join(" ");
      message = keyword
        ? `Sending spicy ${keyword} GIF 😈`
        : "HornyMode activated 😏💦";
    }

    // Type and send message
    await page.type("div[aria-label='Message']", message);
    await page.keyboard.press("Enter");

    const time = new Date().toLocaleTimeString();
    console.log(`[${time}] ✅ SBR SUCCESSFULLY SEND to UID: ${uid}`);

    await sleep(delay);
  }

  console.log("🛑 Bot finished or stopped.");
  return { success: true };
}

module.exports = handleBotCommands;
