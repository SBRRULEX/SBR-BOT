const fs = require('fs');
const path = require('path');

function verifyLogin(req, res, next) {
  const loginMethod = req.headers['x-login-method'];
  const loginDir = path.join(__dirname, '..', 'sessions');

  if (!fs.existsSync(loginDir)) {
    return res.status(400).json({ error: 'Login session not initialized.' });
  }

  let valid = false;

  if (loginMethod === 'token') {
    valid = fs.existsSync(path.join(loginDir, 'token.txt'));
  } else if (loginMethod === 'appstate') {
    valid = fs.existsSync(path.join(loginDir, 'appstate.json'));
  } else if (loginMethod === 'email') {
    valid = fs.existsSync(path.join(loginDir, 'secure_email_login.json'));
  }

  if (!valid) {
    return res.status(401).json({ error: 'Unauthorized. Please log in properly.' });
  }

  next();
}

module.exports = verifyLogin;
