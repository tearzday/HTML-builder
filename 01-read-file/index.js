const fs = require('fs');
const path = require('path');
const { stdout } = process;

const pathToTxtFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathToTxtFile, 'utf-8');

stream.on('data', (data) => stdout.write(data));
