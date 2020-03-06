const path = require('path');
const fs = require("fs");

let fileLog = path.join(__dirname, 'log.txt');
let dataLog;

function readLog() {
    fs.readFile(fileLog, 'utf-8', (error, content) => {
        if (error) {
            console.log(error);
        } else {
            writeLog(content);
        }
    });
}

function addLog(url, method, status) {
    console.log(url, method, status);
    readLog();
}

let log = readLog();
console.log(log);

module.exports = {writeLog};