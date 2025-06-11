const login = require("fb-chat-api");

module.exports = async (req, res) => {
  const { appState, uid, message, delay } = req.body;

  if (!appState || !uid || !message) {
    return res.status(400).json({ error: "Missing appState, uid, or message" });
  }

  try {
    login({ appState }, (err, api) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Facebook login failed", details: err });
      }

      const sendWithDelay = (msgs, index = 0) => {
        if (index >= msgs.length) return;

        api.sendMessage(msgs[index], uid, (err) => {
          const timestamp = new Date().toLocaleTimeString();

          if (err) {
            console.error(`❌ Failed at ${timestamp}:`, err);
          } else {
            console.log(`✅ SBR SUCCESSFULLY SEND at ${timestamp}:`, msgs[index]);
          }

          setTimeout(() => sendWithDelay(msgs, index + 1), delay || 2000);
        });
      };

      const messagesArray = Array.isArray(message) ? message : [message];
      sendWithDelay(messagesArray);
      res.status(200).json({ status: "Bot started sending messages" });
    });
  } catch (error) {
    console.error("Unhandled bot error:", error);
    res.status(500).json({ error: "Bot crashed", details: error });
  }
};
