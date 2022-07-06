'use strict';

const options = {
        port: 9990,
        env: 'dev',
        production: false,
        cors: {
            origin: [
                'http://localhost:4200'
            ],
            optionsSuccessStatus: 200
        }
    },
    App = require('./app/app'),
    {server} = App(options);

server.listen(options.port, function() {
    console.log('Magic happens on port ' + options.port);
});
