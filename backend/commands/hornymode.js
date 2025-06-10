const fs = require('fs');
const path = require('path');

module.exports = async function handleHornymodeCommand(args) {
  const mediaBase = path.join(__dirname, '../../public/media/hornymode');

  let targetFolder;

  if (args.length === 0) {
    targetFolder = path.join(mediaBase, 'random');
  } else {
    const keyword = args.join('_').toLowerCase(); // e.g., bro_sis
    targetFolder = path.join(mediaBase, keyword);
    if (!fs.existsSync(targetFolder)) {
      targetFolder = path.join(mediaBase, 'random');
    }
  }

  const mediaFiles = fs.readdirSync(targetFolder).filter(file =>
    /\.(mp4|gif|jpg|jpeg|png)$/i.test(file)
  );

  if (mediaFiles.length === 0) return { error: '🚫 No media found.' };

  const selected = mediaFiles[Math.floor(Math.random() * mediaFiles.length)];
  const relativeUrl = `/media/hornymode/${args.length ? args.join('_').toLowerCase() + '/' : 'random/'}${selected}`;

  return {
    type: 'media',
    filePath: path.join(targetFolder, selected),
    publicUrl: relativeUrl
  };
};
