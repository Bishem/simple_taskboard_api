'use strict';

module.exports = function (app) {

    app.use('/state', app.routing);

    app.routing.get('/', app.middleware.checkToken, app.controllers.State.findAll);
    app.routing.get('/:id', app.middleware.checkToken, app.controllers.State.findOne);
};
