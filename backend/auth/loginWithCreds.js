const { default: login } = require("facebook-chat-api");

function loginWithCredentials(email, password, callback) {
  login({ email, password }, (err, api) => {
    if (err) {
      if (err.error === 'login-approval') {
        console.log("2FA Code Needed");
        // You'll handle the 2FA externally via UI or prompt
        return callback("2FA_REQUIRED", err.continue);
      }
      return callback(err);
    }

    callback(null, api);
  });
}

module.exports = loginWithCredentials;
