const fs = require('fs');
const path = require('path');

function getSessionType(body) {
    if (body.token) return 'token';
    if (body.appstate) return 'appstate';
    if (body.email && body.password) return 'credentials';
    return null;
}

function saveSession(type, data) {
    const file = path.join(__dirname, `session/${type}.json`);
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

function getSession(type) {
    const file = path.join(__dirname, `session/${type}.json`);
    if (fs.existsSync(file)) {
        return JSON.parse(fs.readFileSync(file));
    }
    return null;
}

module.exports = { getSessionType, saveSession, getSession };
