const fs = require("fs");
const path = require("path");

function readTextFile(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    const lines = raw
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0);
    return lines;
  } catch (err) {
    throw new Error(`⚠️ Unable to read file: ${filePath}`);
  }
}

function saveUploadedFile(file, destDir) {
  const filename = path.basename(file.originalname);
  const destPath = path.join(destDir, filename);
  fs.writeFileSync(destPath, file.buffer);
  return destPath;
}

module.exports = {
  readTextFile,
  saveUploadedFile
};
