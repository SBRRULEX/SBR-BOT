const delay = require('./delay');
const chalk = require('chalk');

async function sendGroupMessage(page, groupUrl, messages, customDelay, stopCode, io) {
  console.log(chalk.cyan(`[GROUP] Sending to group: ${groupUrl}`));

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];

    // Stop code check
    if (global.STOP_CODE === stopCode) {
      console.log(chalk.red(`[GROUP] ❌ Stopped by user.`));
      break;
    }

    try {
      // Navigate to group chat
      await page.goto(groupUrl, { waitUntil: 'networkidle2' });

      // Wait for message input box
      await page.waitForSelector('[contenteditable="true"]', { timeout: 10000 });

      // Type and send message
      await page.type('[contenteditable="true"]', msg, { delay: 50 });
      await page.keyboard.press('Enter');

      const timestamp = new Date().toLocaleTimeString();
      const log = `[GROUP] ✅ ${timestamp} - SBR SUCCESSFULLY SEND to ${groupUrl}: ${msg}`;
      console.log(chalk.green(log));

      if (io) {
        io.emit('log', log);
      }

      // Wait between messages
      await delay(customDelay);

    } catch (err) {
      console.log(chalk.red(`[GROUP] ⚠️ Error sending message to group: ${err.message}`));
      if (io) {
        io.emit('log', `[ERROR] Could not send to group: ${groupUrl}`);
      }
    }
  }
}

module.exports = sendGroupMessage;
