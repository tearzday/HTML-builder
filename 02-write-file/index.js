const { stdin, stdout } = process;
const readline = require('node:readline');
const fs = require('fs');
const path = require('path');

const pathToTxtFile = path.join(__dirname, 'text.txt');
const stream = fs.createWriteStream(pathToTxtFile);

stdout.write('Specify the text to be added to the file\n');

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

rl.on('line', (data) => {
  if (data.toString().trim() === 'exit') {
    closeReadline();
  } else {
    stream.write(data + '\n');
  }
});

rl.on('SIGINT', closeReadline);

function closeReadline() {
  rl.close();
  stdout.write('Goodbay\n');
}
