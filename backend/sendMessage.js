const fs = require("fs");
const path = require("path");

let stopCode = null;

function generateStopCode() {
  stopCode = Math.floor(100000 + Math.random() * 900000).toString();
  return stopCode;
}

function getStopCode() {
  return stopCode;
}

function shouldStop(inputCode) {
  return inputCode === stopCode;
}

function sendMessages(api, uidList, messageList, delay, logFn, doneFn) {
  let i = 0, j = 0;

  function next() {
    if (i >= uidList.length) {
      doneFn("✅ All messages sent!");
      return;
    }

    if (j >= messageList.length) j = 0;

    const uid = uidList[i];
    const message = messageList[j];
    const timestamp = new Date().toLocaleString();

    api.sendMessage(message, uid, (err) => {
      if (err) {
        logFn(`❌ Failed to send to ${uid}: ${err}`);
      } else {
        logFn(`✅ [${timestamp}] Sent to ${uid}: "${message}"`);
      }

      j++;
      i++;

      setTimeout(next, delay);
    });
  }

  next();
}

module.exports = {
  generateStopCode,
  getStopCode,
  shouldStop,
  sendMessages
};
