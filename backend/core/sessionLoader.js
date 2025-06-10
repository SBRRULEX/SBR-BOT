const login = require("facebook-chat-api");

function getSessionFromAppState(appState) {
  return new Promise((resolve, reject) => {
    login({ appState }, (err, api) => {
      if (err) return reject(err);
      resolve(api);
    });
  });
}

function getSessionFromToken(token) {
  return new Promise((resolve, reject) => {
    login({ accessToken: token }, (err, api) => {
      if (err) return reject(err);
      resolve(api);
    });
  });
}

module.exports = {
  getSessionFromAppState,
  getSessionFromToken
};
