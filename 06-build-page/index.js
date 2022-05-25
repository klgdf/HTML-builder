const path = require('path');
const fs = require('fs');

//merge styles
const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
const stylesFolder = path.join(__dirname, 'styles');

fs.promises.readdir(stylesFolder).then(files => {
  files.forEach(file => {
    const pathFile = path.join(stylesFolder, file);
    fs.promises.stat(pathFile).then((elem) => {
      if ((file.split('.')[1] !== 'css') || !elem.isFile()) return;
      const readStream = fs.createReadStream(pathFile, 'utf-8');
      readStream.on('data', chunk => output.write(chunk));
    });
  });
});
