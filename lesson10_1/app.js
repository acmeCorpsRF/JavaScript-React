let yargs = require('yargs');
let server = require('./server');

yargs.command({
    command: 'runServer',
    describe: 'Запустить сервер',
    handler() {
        server.server.listen(3000);
    }
});
yargs.parse();