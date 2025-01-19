const fs = require('fs');
const path = require('path');

function toggleFolder(folderPath) {
  fs.mkdir(folderPath, (err) => {
    if (err) {
      fs.rm(folderPath, { recursive: true }, (err) => {
        if (err) {
          throw err;
        } else {
          toggleFolder(folderPath);
        }
      });
    } else {
      cloneFile();
    }
  });
}

function cloneFile() {
  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    files.forEach((file) => {
      const filePath = path.join(__dirname, 'files', file);
      fs.copyFile(filePath, path.join(__dirname, 'files-copy', file), (err) => {
        if (err) throw err;
      });
    });
  });
}

toggleFolder(path.join(__dirname, 'files-copy'));
