const path = require('path');
const fs = require('fs');
const origFolder =  path.join(__dirname, 'files');
const copyDir = path.join(__dirname, 'files-copy');

fs.readdir(__dirname, (error) => {
  if (error) throw error;
  fs.rm(copyDir, { recursive: true, force: true }, (error) => {
    if (error) throw error;
    fs.mkdir(copyDir, { recursive: true }, (error) => {
      if (error) throw error;
    });
    fs.readdir(origFolder, (err, files) => {
      if (err) throw err;
      files.forEach((file) => {
        const pathOld = path.join(origFolder, file);
        const pathNew = path.join(copyDir, file);
        fs.copyFile(pathOld, pathNew, (err) => {
          if (err) throw Error;
        });
      });
    });
  });
});