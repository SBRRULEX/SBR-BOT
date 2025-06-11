// backend/botHandler.js

const fs = require("fs");
const path = require("path");
const readlineSync = require("readline-sync");
const { Facebook } = require("fb-chat-api");

module.exports = async (req, res) => {
  try {
    const { appState, uid, message, delay } = req.body;

    if (!appState || !uid || !message) {
      return res.status(400).json({ error: "Missing appState, uid, or message" });
    }

    const loginOptions = {
      appState: JSON.parse(appState),
      forceLogin: true,
      logLevel: "silent",
    };

    Facebook(loginOptions, async (err, api) => {
      if (err) {
        console.error("FB Login Error:", err);
        return res.status(500).json({ error: "Login failed" });
      }

      api.setOptions({ listenEvents: true });

      const messageData = {
        body: message
      };

      const delayMs = parseInt(delay) || 2000;

      const uids = Array.isArray(uid) ? uid : [uid];

      for (let user of uids) {
        await new Promise(resolve => {
          api.sendMessage(messageData, user, (err) => {
            if (err) {
              console.error(`Failed to send message to ${user}`, err);
            } else {
              console.log(`[SBR SUCCESSFULLY SEND] To: ${user} - ${message}`);
            }
            setTimeout(resolve, delayMs);
          });
        });
      }

      return res.status(200).json({ status: "Messages sent successfully." });
    });

  } catch (error) {
    console.error("Bot Handler Error:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};
