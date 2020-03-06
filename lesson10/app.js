let yargs = require('yargs');
let server = require('./server');
let dataHandler = require('./dataHandler');

yargs.command({
    command: 'runServer',
    describe: 'Запустить сервер',
    handler() {
        server.server.listen(3000);
    }
});
yargs.command({
    command: 'add',
    describe: 'Добавить заметку',
    builder: {
        title: {
            type: 'string',
            demandOption: true,
            describe: 'название заметки'
        },
        text: {
            type: 'string',
            demandOption: true,
            describe: 'текст заметки'
        }
    },
    handler({title, text}) {
        dataHandler.addData(title, text);
    }
});
yargs.parse();