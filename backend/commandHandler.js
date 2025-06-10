const fs = require("fs");
const path = require("path");

const assetsPath = path.join(__dirname, "../assets");

function getRandomFile(folderPath) {
  const files = fs.readdirSync(folderPath).filter(file => /\.(mp4|gif|jpg|png)$/i.test(file));
  if (!files.length) return null;
  return path.join(folderPath, files[Math.floor(Math.random() * files.length)]);
}

function handleHornyModeCommand(text) {
  const baseFolder = "hornymode";
  const args = text.split(" ").slice(1);
  const keyword = args.join("_").toLowerCase(); // bro sis => bro_sis
  let targetFolder = path.join(assetsPath, baseFolder, keyword);

  if (!fs.existsSync(targetFolder)) {
    targetFolder = path.join(assetsPath, baseFolder, "random");
  }

  const mediaFile = getRandomFile(targetFolder);
  return mediaFile;
}

function handleBlackedRawCommand(text) {
  const baseFolder = "blackedraw";
  const args = text.split(" ").slice(1);
  const keyword = args.join("_").toLowerCase(); // jack slayher => jack_slayher
  let targetFolder = path.join(assetsPath, baseFolder, keyword);

  if (!fs.existsSync(targetFolder)) {
    targetFolder = path.join(assetsPath, baseFolder, "random");
  }

  const mediaFile = getRandomFile(targetFolder);
  return mediaFile;
}

function handleCommand(text) {
  if (!text.startsWith("+")) return null;

  const command = text.trim().split(" ")[0].toLowerCase();

  switch (command) {
    case "+hornymode":
      return handleHornyModeCommand(text);
    case "+blackedraw":
      return handleBlackedRawCommand(text);
    default:
      return null;
  }
}

module.exports = { handleCommand };
