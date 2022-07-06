'use strict';

module.exports = function (options) {
    return {
        environment: {
            db: {
                database: 'twitterlikedb',
                username: 'root',
                password: 'root',
                host: 'localhost',
                dialect: 'mariadb',
                port: 3306
            },
            logger: {
                console: {
                    enable: false
                },
                file: {
                    enable: true
                }
            },
            sequelize: {
                operatorsAliases: false,
                define: {
                    freezeTableName: true,
                    timestamps: true,
                    paranoid: false,
                    charset: 'utf8',
                    dialectOptions: {
                        collate: 'utf8_general_ci'
                    }
                },
                pool: {
                    max: 5,
                    min: 0,
                    acquire: 30000,
                    idle: 10000
                },
                logging: function(message) {
                    global.logger.debug(message);
                }
            },
            options: {
                port: options.port,
                env: options.env,
                production: options.production
            }
        }
    }
};
