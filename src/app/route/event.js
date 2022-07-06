'use strict';

module.exports = function (app) {

    app.use('/event', app.routing);

    app.routing.get('/', app.middleware.checkToken, app.controllers.Event.findAll);
    app.routing.get('/:id', app.middleware.checkToken, app.controllers.Event.findOne);
};
