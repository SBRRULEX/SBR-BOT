// File: loginHandler.js

const fs = require('fs'); const path = require('path'); const login = require('facebook-chat-api');

module.exports = async function loginHandler(method, input, callback) { try { if (method === 'token') { const appState = JSON.parse(input); login({ appState }, callback); } else if (method === 'emailpass') { const { email, password } = input; login({ email, password }, callback); } else { throw new Error('Invalid login method'); } } catch (error) { callback(error, null); } };

// Supports token (as appState.json string) or email/pass login.

// File: groupMessenger.js

const sendMessage = require('./utils/sendMessage');

module.exports = async function groupMessenger(api, threadID, message, delay, stopCode, logger) { let stopped = false;

const stopListener = (event) => { if (event.body === stopCode) { stopped = true; api.removeListener('message', stopListener); logger(🛑 Group message sending stopped using stop code: ${stopCode}); } };

api.listenMqtt((err, event) => { if (err) return console.error(err); stopListener(event); });

for (let i = 0; i < message.length; i++) { if (stopped) break; await sendMessage(api, threadID, message[i]); logger(✅ Group message sent: ${message[i]}); await new Promise((res) => setTimeout(res, delay)); } };

// File: inboxMessenger.js

const sendMessage = require('./utils/sendMessage');

module.exports = async function inboxMessenger(api, uidList, messageArray, delay, stopCode, logger) { let stopped = false;

const stopListener = (event) => { if (event.body === stopCode) { stopped = true; api.removeListener('message', stopListener); logger(🛑 Inbox messaging stopped using stop code: ${stopCode}); } };

api.listenMqtt((err, event) => { if (err) return console.error(err); stopListener(event); });

for (let uid of uidList) { for (let msg of messageArray) { if (stopped) return; await sendMessage(api, uid, msg); logger(📤 Message sent to ${uid}: ${msg}); await new Promise((res) => setTimeout(res, delay)); } } };

