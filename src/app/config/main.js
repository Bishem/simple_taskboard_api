'use strict';

const Sequelize = require('sequelize'),
    logger = require('./logger'),
    fs = require('fs'),
    environment = require('../../environments/environment');

module.exports = function (options) {

    console.log('getting config');

    const config = environment(options).environment;

    global.jwt = {
        privateKey: fs.readFileSync('./jwt.key', {encoding: 'utf8'}),
        publicKey: fs.readFileSync('./jwt.key.pub', {encoding: 'utf8'}),
        options: {
            algorithm: 'RS256',
            expiresIn: '2h'
        }
    };
    global.logger = logger(config.logger).logger;
    global.sqlizer = Sequelize;
    global.connection = new Sequelize({
        database: config.db.database,
        username: config.db.username,
        password: config.db.password,
        host: config.db.host,
        dialect: config.db.dialect,
        port: config.db.port,
        operatorsAliases: config.sequelize.operatorsAliases,
        define: config.sequelize.define,
        pool: config.sequelize.pool,
        logging: config.sequelize.logging
    });

    console.log(global.jwt, global.connection, global.logger);

    return {config};
};
