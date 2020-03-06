let path = require('path');
let fs = require('fs');
let filePath = path.join(__dirname, 'data.json');

function addData(title, text) {
    readFile((content => {
        let json = JSON.parse(content);
        json.push({title, text});
        let update = JSON.stringify(json);
        fs.writeFile(filePath, update, error => {
            if (error) throw new Error(error);
        });
    }));
}

function getData(callBack) {
    readFile(callBack);
}

function readFile(callBack) {
    fs.readFile(filePath, 'utf-8', (error, content) => {
        if (error) console.log(error);
        callBack(content);
    });
}

module.exports = {addData, getData};