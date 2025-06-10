const fs = require("fs");
const path = require("path");

// Helper to get a random file from a directory
function getRandomFileFromDir(dirPath) {
  const files = fs.readdirSync(dirPath).filter(file => file.endsWith(".mp4") || file.endsWith(".gif"));
  if (files.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * files.length);
  return path.join(dirPath, files[randomIndex]);
}

// Handle BlackedRaw command
function handleBlackedRaw(query) {
  const baseDir = path.join(__dirname, "../../assets/blackedraw");

  if (query && query.trim() !== "") {
    const performerDir = path.join(baseDir, query.trim().toLowerCase().replace(/\s+/g, "_"));
    if (fs.existsSync(performerDir)) {
      return getRandomFileFromDir(performerDir);
    }
  }

  return getRandomFileFromDir(baseDir + "/random");
}

// Handle HornyMode command
function handleHornyMode(query) {
  const baseDir = path.join(__dirname, "../../assets/hornymode");

  if (query && query.trim() !== "") {
    const tagDir = path.join(baseDir, query.trim().toLowerCase().replace(/\s+/g, "_"));
    if (fs.existsSync(tagDir)) {
      return getRandomFileFromDir(tagDir);
    }
  }

  return getRandomFileFromDir(baseDir + "/random");
}

// Handle BroSis command
function handleBroSis() {
  const baseDir = path.join(__dirname, "../../assets/bros_sis");
  return getRandomFileFromDir(baseDir);
}

// Handle Random command
function handleRandom() {
  const baseDir = path.join(__dirname, "../../assets/random");
  return getRandomFileFromDir(baseDir);
}

// Exporting based on command
function getMediaFromCommand(command, query = "") {
  switch (command.toLowerCase()) {
    case "+blackedraw":
      return handleBlackedRaw(query);
    case "+hornymode":
      return handleHornyMode(query);
    case "+brosis":
      return handleBroSis();
    case "+random":
      return handleRandom();
    default:
      return null;
  }
}

module.exports = {
  getMediaFromCommand
};
