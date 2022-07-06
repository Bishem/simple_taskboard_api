'use strict';

module.exports = function (app) {

    app.use('/project', app.routing);

    app.routing.get('/', app.middleware.checkToken, app.controllers.Project.findAll);
    app.routing.get('/:id', app.middleware.checkToken, app.controllers.Project.findOne);
};
