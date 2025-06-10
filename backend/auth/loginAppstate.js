const { default: login } = require("facebook-chat-api");
const fs = require("fs");

function loginWithAppstate(appstatePath, callback) {
  if (!fs.existsSync(appstatePath)) {
    return callback(new Error("Appstate JSON file not found"));
  }

  const appState = JSON.parse(fs.readFileSync(appstatePath, "utf-8"));

  login({ appState }, (err, api) => {
    if (err) return callback(err);
    callback(null, api);
  });
}

module.exports = loginWithAppstate;
