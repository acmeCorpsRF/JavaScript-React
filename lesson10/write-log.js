const path = require('path');
const fs = require("fs");

let fileLog = path.join(__dirname, 'log.txt');

function writeLog(info) {
    fs.appendFile(fileLog, info, (err) => {
        if (err) throw err;
    });
}

function addLog(date, url, method, status) {
    let record = `${date} ${url} ${method} ${status}\n`;
    writeLog(record);
}

module.exports = {addLog};