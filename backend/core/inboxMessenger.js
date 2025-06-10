const delay = require('./delay');
const chalk = require('chalk');

async function sendInboxMessage(page, uid, messages, customDelay, stopCode, io) {
  console.log(chalk.blue(`[INBOX] Sending to UID: ${uid}`));

  for (let i = 0; i < messages.length; i++) {
    const msg = messages[i];

    // Stop code check
    if (global.STOP_CODE === stopCode) {
      console.log(chalk.red(`[INBOX] ❌ Stopped at user request.`));
      break;
    }

    try {
      // Go to user chat
      await page.goto(`https://www.facebook.com/messages/t/${uid}`, { waitUntil: 'networkidle2' });

      // Wait and type message
      await page.waitForSelector('[contenteditable="true"]', { timeout: 10000 });
      await page.type('[contenteditable="true"]', msg, { delay: 50 });

      // Press Enter to send
      await page.keyboard.press('Enter');

      const timestamp = new Date().toLocaleTimeString();
      const log = `[INBOX] ✅ ${timestamp} - SBR SUCCESSFULLY SEND to UID ${uid}: ${msg}`;
      console.log(chalk.green(log));

      if (io) {
        io.emit('log', log);
      }

      // Delay between messages
      await delay(customDelay);

    } catch (err) {
      console.log(chalk.red(`[INBOX] ⚠️ Error sending message to UID ${uid}: ${err.message}`));
      if (io) {
        io.emit('log', `[ERROR] Could not send to UID ${uid}.`);
      }
    }
  }
}

module.exports = sendInboxMessage;
