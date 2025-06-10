const fs = require('fs');
const path = require('path');

const loadCommand = (prefix, message) => {
    const lowerMsg = message.toLowerCase();

    // +hornymode [optional keyword]
    if (lowerMsg.startsWith(`${prefix}hornymode`)) {
        const keyword = message.slice(`${prefix}hornymode`.length).trim().replace(/\s+/g, '_').toLowerCase();
        const folder = keyword ? `hornymode/${keyword}` : 'hornymode/random';
        const filePath = getRandomFile(`assets/${folder}`);
        return filePath;
    }

    // +blackedraw [optional performer name]
    if (lowerMsg.startsWith(`${prefix}blackedraw`)) {
        const performer = message.slice(`${prefix}blackedraw`.length).trim().replace(/\s+/g, '_').toLowerCase();
        const folder = performer ? `blackedraw/${performer}` : 'blackedraw/random';
        const filePath = getRandomFile(`assets/${folder}`);
        return filePath;
    }

    return null;
};

function getRandomFile(folderPath) {
    try {
        const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.mp4') || file.endsWith('.gif'));
        if (!files.length) return null;
        const selected = files[Math.floor(Math.random() * files.length)];
        return path.join(folderPath, selected);
    } catch (err) {
        return null;
    }
}

module.exports = { loadCommand };
