'use strict';

const winston = require('winston'),
    moment = require('moment'),
    extend = require('deep-extend');

module.exports = function (options) {
    const printTimestamp = function () {
        return moment.utc().format('DD-MM-YYYY HH:mm:ss z');
    };
    options = extend({
        console: {
            enable: true,
            levels: {
                debug: true,
                info: false,
                error: false
            }
        },
        file: {
            enable: true
        }
    }, options || {});

    return {
        logger: winston.createLogger({
            transports: [
                new winston.transports.Console({
                    timestamp: printTimestamp,
                    level: 'debug',
                    name: 'debug-console',
                    silent: !(options.console.enable && options.console.levels.debug),
                    prettyPrint: true,
                    colorize: true
                }),
                new winston.transports.Console({
                    timestamp: printTimestamp,
                    level: 'info',
                    name: 'info-console',
                    silent: !(options.console.enable && options.console.levels.info),
                    colorize: true
                }),
                new winston.transports.Console({
                    timestamp: printTimestamp,
                    level: 'error',
                    name: 'error-console',
                    silent: !(options.console.enable && options.console.levels.error),
                    colorize: true
                }),
                new winston.transports.File({
                    timestamp: printTimestamp,
                    level: 'silly',
                    name: 'file',
                    filename: 'logs/' + (options.file.filename || 'server') + '.log',
                    maxsize: 50 * 1024 * 1024, // 1Mo
                    rotationFormat: function () {
                        return moment.utc().format('_YYYY-MM-DD_HH-mm-ss');
                    },
                    silent: !options.file.enable,
                    json: false
                })
            ]
        })
    };
};

/*
const levels = {
        silly: 0,
        input: 1,
        verbose: 2,
        prompt: 3,
        debug: 4,
        info: 5,
        data: 6,
        help: 7,
        warn: 8,
        error: 9
    },
    colors = {
        silly: "magenta",
        input: "grey",
        verbose: "cyan",
        prompt: "grey",
        debug: "blue",
        info: "green",
        data: "grey",
        help: "cyan",
        warn: "yellow",
        error: "red"
    };
*/
