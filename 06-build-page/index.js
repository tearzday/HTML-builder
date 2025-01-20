const fsPromises = require('fs').promises;
const path = require('path');

const pathDist = path.join(__dirname, 'project-dist');
const pathStyles = path.join(__dirname, 'styles');
const pathBuildStyle = path.join(__dirname, 'project-dist', 'style.css');
const pathAssets = path.join(__dirname, 'assets');
const pathBuildAssets = path.join(pathDist, 'assets');
const pathTemplate = path.join(__dirname, 'template.html');
const pathComponentsHTML = path.join(__dirname, 'components');
const pathBuildHTML = path.join(pathDist, 'index.html');

function createDir(path) {
  fsPromises.mkdir(path, { recursive: true }, (err) => {
    if (err) console.log('tyt');
  });
}

async function buildStyle() {
  let files = await fsPromises.readdir(pathStyles);
  let styles = '';
  for (let file of files) {
    const data = await fsPromises.readFile(
      path.join(pathStyles, file),
      'utf-8',
    );
    styles += data + '\n';
  }
  fsPromises.writeFile(pathBuildStyle, styles);
}

async function cloneAssets(inputPath, outputPath) {
  createDir(outputPath);
  const files = await fsPromises.readdir(inputPath, { withFileTypes: true });

  for (let file of files) {
    const inputFile = path.join(inputPath, file.name);
    const outputFile = path.join(outputPath, file.name);

    if (file.isDirectory()) {
      await cloneAssets(inputFile, outputFile);
    } else {
      await fsPromises.copyFile(inputFile, outputFile);
    }
  }
}

async function buildHtml() {
  let templateHtml = await fsPromises.readFile(pathTemplate, 'utf-8');
  const matches = templateHtml.match(/{{(.*?)}}/g);

  for (let match of matches) {
    let data = await fsPromises.readFile(
      path.join(pathComponentsHTML, match.slice(2, match.length - 2) + '.html'),
      'utf-8',
    );
    templateHtml = templateHtml.replace(match, data.toString());
  }
  await fsPromises.writeFile(pathBuildHTML, templateHtml);
}

createDir(pathDist);
buildStyle();
cloneAssets(pathAssets, pathBuildAssets);
buildHtml();
