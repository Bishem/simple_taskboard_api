'use strict';

module.exports = function (app) {

    app.use('/feature', app.routing);

    app.routing.get('/', app.middleware.checkToken, app.controllers.Feature.findAll);
    app.routing.get('/:id', app.middleware.checkToken, app.controllers.Feature.findOne);
};
