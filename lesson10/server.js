let http = require('http');
let dataHandler = require('dataHandler');

let server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
    dataHandler.getData(res.end.bind(res));
});
module.exports = {server};