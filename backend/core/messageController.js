// backend/core/messageController.js

module.exports = async (req, res) => {
  try {
    const { uid, message } = req.body;

    if (!uid || !message) {
      return res.status(400).json({ success: false, error: 'UID aur message required hain.' });
    }

    console.log(`[MSG-LOG] UID: ${uid} | Message: ${message}`);

    // Yahan message bhejne ka logic ayega (dummy success response diya gaya hai)
    // TODO: actual Facebook automation logic integrate karo yahan
    res.status(200).json({ success: true, message: 'SBR SUCCESSFULLY SEND' });
  } catch (err) {
    console.error('MessageController Error:', err);
    res.status(500).json({ success: false, error: 'Internal server error while sending message.' });
  }
};
