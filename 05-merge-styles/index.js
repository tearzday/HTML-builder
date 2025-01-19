const fs = require('fs');
const path = require('path');

const bundleStream = fs.createWriteStream(
  path.join(__dirname, 'project-dist', 'bundle.css'),
);

fs.readdir(path.join(__dirname, 'styles'), (err, files) => {
  files.forEach((file) => {
    fs.stat(path.join(__dirname, 'styles') + '/' + file, (err, stats) => {
      if (!stats.isDirectory() && path.parse(file).ext === '.css') {
        fs.createReadStream(
          path.join(__dirname, 'styles') + '/' + file,
          'utf-8',
        ).on('data', (data) => bundleStream.write(data));
      }
    });
  });
});
