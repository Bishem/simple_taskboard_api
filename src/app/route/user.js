'use strict';

module.exports = function (app) {

    app.use('/auth', app.routing);

    app.routing.get('/me', app.middleware.checkToken, app.controllers.User.authMe);
    app.routing.post('/log-in', app.middleware.logIn);
    app.routing.post('/sign-up', app.middleware.signUp);
    app.routing.put('/', app.middleware.checkToken, app.controllers.User.update);
    app.routing.delete('/sign-out', app.middleware.checkToken, app.controllers.User.signOut);
};
