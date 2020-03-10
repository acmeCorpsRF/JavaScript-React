const http = require('http');
const path = require('path');
const fs = require("fs");
const log = require('./write-log.js');

let server = http.createServer(function (request, response) {
    let file = path.join(__dirname, request.url);
    if (request.url === "/") {
        fs.readFile(file + 'index.html', 'utf-8', (error, data) => {
            if (data) {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            }
        });
    } else if (request.url === "/slider") {
        let newUrl = file.replace("slider", '');
        newUrl = path.join(newUrl, '/pages' + request.url);
        fs.readFile(newUrl + '.html', 'utf-8', (error, data) => {
            if (data) {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            }
        });
    } else if (request.url === "/registration") {
        let newUrl = file.replace("registration", '');
        newUrl = path.join(newUrl, '/pages' + request.url);
        fs.readFile(newUrl + '.html', 'utf-8', (error, data) => {
            if (data) {
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            }
        });
    } else {
        let newUrl = file.replace(request.url.slice(1), '');
        newUrl = path.join(newUrl, '/pages');
        fs.readFile(newUrl + '/404.html', 'utf-8', (error, data) => {
            if (data) {
                response.writeHead(404, {'Content-Type': 'text/html'});
                response.end(data);
            }
        });
    }

    if (request.url.match(/.css$/)) {
        let data = fs.readFileSync(file, 'utf-8');
        response.writeHead(200, {'Content-Type': 'text/css'});
        response.end(data);
    }
    if (request.url.match(/.js$/)) {
        let data = fs.readFileSync(file, 'utf-8');
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        response.end(data);
    }
    log.addLog(new Date, request.url, request.method, response.statusCode);
});
module.exports = {server};