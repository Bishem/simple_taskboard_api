'use strict';

module.exports = function (app) {

    app.use('/event-type', app.routing);

    app.routing.get('/', app.middleware.checkToken, app.controllers.EventType.findAll);
    app.routing.get('/:id', app.middleware.checkToken, app.controllers.EventType.findOne);
};
