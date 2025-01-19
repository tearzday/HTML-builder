const fs = require('fs');
const path = require('path');
const { stdout } = process;

const dirname = path.join(__dirname, 'secret-folder');

fs.readdir(dirname, (err, files) => {
  files.forEach((file) => {
    fs.stat(dirname + '/' + file, (err, stats) => {
      if (!stats.isDirectory()) {
        stdout.write(
          `${path.parse(file).name} - ${path.parse(file).ext.slice(1)} - ${
            stats.size * 0.001
          }kb\n`,
        );
      }
    });
  });
});
