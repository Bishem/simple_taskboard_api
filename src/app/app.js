'use strict';

const express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    glob = require('glob'),
    config = require('./config/main'),
    errors = require('./errors'),
    schemas = require('./schemas'),
    seed = require('./model/seed/seed'),
    _ = require('lodash'),
    cors = require('cors'),
    middleware = require('./middleware');

// todo implement exception handling in controllers

module.exports = function (options) {
    const app = new express();

    initExpress()
        .then(initModels)
        .then(initConstraints)
        .then(initMigrations)
        .then(initControllers)
        .then(initRoutes)
        .catch(console.error);

    return {server : http.createServer(app)};

    async function initExpress() {

        console.log('init express');

        app.use(bodyParser.json({extended: true}));
        app.use(bodyParser.urlencoded({extended: true}));

        if(!options.production) {

            console.log('using cors');

            app.use(cors(options.cors));
        }

        app.routing = express.Router();

        app.config = config(options).config;

        app.routing.use(function (err, req, res, next) { // handles errors
            if (options.production) delete err.stack;
            res.status(err.errorCode || 500).json(err);
        });

        app.use('/api', app.routing);

        errors(app);
        schemas(app);
        middleware(app);

        app.models = {};
        app.controllers = {};
    }

    async function initModels() {

        console.log('init models');

        glob(__dirname + '/model/*.js', buildModules);
    }

    async function initConstraints() {

        console.log('init constraints on ', app.models,global.connection.models);

        _.values(app.models).forEach(function (model) {
            model.associate();
        });
    }

    async function initMigrations() {

        console.log('init migrations');

        await global.connection
            .sync({force: !app.config.options.production})
            .then(() => {
                if(!app.config.options.production) {
                    seed.insert(app.models);
                }
            });
    }

    async function initControllers() {

        console.log('init controllers');

        glob(__dirname + '/controller/*.js', buildModules);
    }

    async function initRoutes() {

        console.log('init routes');

        glob(__dirname + '/route/*.js', buildModules);
    }

    function buildModules(err, modules) {
        _.values(modules).forEach(async function(module) {
            require(module)(app);
        });
    }
};
