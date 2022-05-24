const path = require('path');
const fs = require('fs');
const filepath = path.join(__dirname, 'text.txt');

const stream = fs.createReadStream(filepath, 'utf-8');
stream.on('data', data => console.log(data));
stream.on('error', error => console.log(error.message));

//Пожалуйста, дайте время до обеда среды или оставьте свой дискорд - я свяжусь с вами, как только закончу
//Спасибо)