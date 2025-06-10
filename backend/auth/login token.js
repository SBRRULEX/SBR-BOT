const { default: login } = require("facebook-chat-api");

function loginWithToken(token, callback) {
  login({ access_token: token }, (err, api) => {
    if (err) return callback(err);
    callback(null, api);
  });
}

module.exports = loginWithToken;
