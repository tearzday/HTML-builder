const fs = require('fs');
const path = require('path');
const { stdout } = process;

const pathToTxtFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathToTxtFile, 'utf-8');

let textData = '';

stream.on('data', (chunk) => (textData += chunk));
stream.on('end', () => stdout.write(textData));
