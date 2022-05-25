const path = require('path');
const fs = require('fs');
const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (error, files) => {
  if (error) throw Error;
  files.forEach(file => {
    if (file.isFile()) {
      const fName = file.name.split('.')[0];
      const fExt = file.name.split('.')[1];

      fs.stat(path.join(folderPath, file.name), (error, stats) => {
        if (error) throw Error;
        console.log(fName + ' - ' + fExt + ' - ' + stats.size + 'b');
      });
    }
  });
});