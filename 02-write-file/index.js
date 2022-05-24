const path = require('path');
const fs = require('fs');
const output = fs.createWriteStream(path.join(__dirname, 'output.txt'));
const { stdout, stdin, exit } = process;

stdout.write('Доброго дня! Какое сегодня число?\n');
stdin.on('data', data => data.toString().trim() === 'exit' ? process.exit() : output.write(data));
// stdin.on('error', error => stdout.write('Error', error.message));

process.on('SIGINT', () => exit());
process.on('exit', () => stdout.write('Пока! Спасибо за ответ!\n'));

