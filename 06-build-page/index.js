const path = require('path');
const fs = require('fs');

//сборка стилей
async function mergeStyles() {
  const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
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
}


//копирование директории
async function copyDirectory(startDir, endDir) {
  const startDirPath = path.join(__dirname, startDir);
  const endDirPath = path.join(__dirname, endDir);

  await fs.promises.mkdir(endDirPath, { recursive: true });
  fs.readdir((startDirPath), { withFileTypes: true }, (error, files) => {
    if (error) throw error;
    files.forEach(file => {
      if (!file.isDirectory()) {
        fs.copyFile(path.join(startDirPath, file.name), path.join(endDirPath, file.name), (error) => {
          if (error) throw error;
        });
      } else {
        copyDirectory(`${startDir}/${file.name}`, `${endDir}/${file.name}`);
      }
    });
  });
}

//сборка компонентов
async function mergeComponents() {
  let template = await fs.promises.readFile(path.join(__dirname, 'template.html'));
  let HTML = template.toString();
  const componentsPath = path.join(__dirname, 'components');
  const components = await fs.promises.readdir(componentsPath);
  const buildFilePath = path.join(__dirname, 'project-dist', 'index.html');

  for (const component of components) {
    const compPath = path.join(componentsPath, component);
    const compName = component.split('.')[0];
    const compData = await fs.promises.readFile(compPath);
    HTML = HTML.toString().replace(`{{${compName}}}`, compData.toString());
  }

  await fs.promises.writeFile(buildFilePath, HTML);
}

//завершение работы скрипта

const buildProject = () => {
  fs.promises.mkdir(path.resolve(__dirname, 'project-dist'), {
    recursive: true,
  });
  copyDirectory('assets', 'project-dist/assets');
  mergeComponents();
  mergeStyles();
};
buildProject();
