'use strict';

const jwt = require('jsonwebtoken'),
    screen = require('screener').screen,
    _ = require('lodash');

 module.exports = function (app) {
    app.middleware = {
        checkToken: function(req, res, next){

            global.logger.debug('checking token for ', req.headers);

            let token = req.headers['authorization'] || req.headers['Authorization'];

            global.logger.debug('token ' + token);

            if (token) {

                if (token.startsWith('Bearer ')) {
                    token = token.slice(7, token.length);
                }

                jwt.verify(token, global.jwt.publicKey, (err, decoded) => {
                    if (err) {
                        next( new app.errors.Unauthorized('Token is not valid'))
                    } else {

                        global.logger.debug('Authorized access');

                        req.decoded = decoded;
                        next();
                    }
                });
            } else {
                next(new app.errors.Unauthorized('Auth token is not supplied'))
            }
        },
        logIn : function (req, res, next) {

            global.logger.debug('loging in ');

            app.controllers.User
                .logIn(req)
                .then( function (user) {
                    global.logger.debug('user before log in', user);

                    const userSecret = req.body;

                    global.logger.debug('user secret', userSecret);

                    if (!(userSecret.email || userSecret.password)) {
                        next(new app.errors.BadRequest('Authentication failed! Please check the request'));
                    }

                    if (!user) {
                        next(new app.errors.NotFound('User does not exists'));
                    }

                    const isAuthenticated = user.authenticate(userSecret.email, userSecret.password);

                    if (!isAuthenticated) {
                        next(new app.errors.Forbidden('Incorrect username or password'));
                    }

                    global.logger.debug('authenticated');

                    global.jwt.options.subject = `${user.id}-${user.initials}`;

                    const token = jwt.sign({},
                        global.jwt.privateKey,
                        global.jwt.options
                    );

                    global.logger.debug('token', token);

                    user = screen(user, app.schemas.User);
                    user.token = token;

                    global.logger.debug('user before response', user);

                    res.status(201).json(user);
                }).catch(next);
        },
        signUp: function (req, res, next) {
            app.controllers.User
                .signUp(req)
                .then( function (user) {
                    global.logger.debug('user before sign in', user);

                    if (!user) {
                        next(new app.errors.NotFound('User does not exists'));
                    }

                    global.logger.debug('authenticated');

                    global.jwt.options.subject = `${user.id}-${user.initials}`;

                    const token = jwt.sign({},
                        global.jwt.privateKey,
                        global.jwt.options
                    );

                    global.logger.debug('token', token);

                    user = screen(user, app.schemas.User);
                    user.token = token;

                    global.logger.debug('user before response', user);

                    res.status(201).json(user);
                }).catch(next);
        }
    };
};
