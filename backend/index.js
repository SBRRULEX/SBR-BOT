const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const upload = multer({ dest: 'uploads/' });

// Global config store
let config = {
  token: '',
  appstate: '',
  email: '',
  password: '',
  uid: '',
  delay: 1000,
  message: '',
  stopCode: '',
  prefix: '+',
  commands: ['blackedraw', 'hornymode'],
};

// Accept token or appstate file
app.post('/upload-auth', upload.single('authFile'), (req, res) => {
  const filePath = req.file.path;
  const content = fs.readFileSync(filePath, 'utf-8');
  if (req.body.type === 'token') {
    config.token = content.trim();
  } else if (req.body.type === 'appstate') {
    try {
      config.appstate = JSON.parse(content);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid appstate JSON' });
    }
  }
  fs.unlinkSync(filePath);
  return res.json({ message: 'Auth uploaded successfully' });
});

// Accept login via email/password
app.post('/login-email', (req, res) => {
  const { email, password } = req.body;
  config.email = email;
  config.password = password;
  // Optional: trigger puppeteer login here if required
  return res.json({ message: 'Email login stored successfully' });
});

// Upload UID and message files
app.post('/upload', upload.fields([{ name: 'uidFile' }, { name: 'msgFile' }]), (req, res) => {
  try {
    const uidFile = req.files['uidFile'][0];
    const msgFile = req.files['msgFile'][0];
    config.uid = fs.readFileSync(uidFile.path, 'utf-8');
    config.message = fs.readFileSync(msgFile.path, 'utf-8');
    fs.unlinkSync(uidFile.path);
    fs.unlinkSync(msgFile.path);
    return res.json({ message: 'UID and message files uploaded' });
  } catch (e) {
    return res.status(500).json({ error: 'Upload failed' });
  }
});

// Set config values manually
app.post('/set-config', (req, res) => {
  const { uid, delay, message, stopCode, prefix } = req.body;
  if (uid) config.uid = uid;
  if (delay) config.delay = parseInt(delay);
  if (message) config.message = message;
  if (stopCode) config.stopCode = stopCode;
  if (prefix) config.prefix = prefix;
  return res.json({ message: 'Config updated' });
});

// Get current config
app.get('/get-config', (req, res) => {
  return res.json(config);
});

// Ping route
app.get('/', (req, res) => {
  res.send('Rocky SBR Bot Backend Running');
});

app.listen(port, () => {
  console.log(`SBR Bot backend running at http://localhost:${port}`);
});
