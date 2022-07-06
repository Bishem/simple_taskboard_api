'use strict';

module.exports = function (app) {

    app.use('/task', app.routing);

    app.routing.post('/', app.middleware.checkToken, app.controllers.Task.create);
    app.routing.get('/', app.middleware.checkToken, app.controllers.Task.findAll);
    app.routing.get('/:id', app.middleware.checkToken, app.controllers.Task.findOne);
    app.routing.put('/', app.middleware.checkToken, app.controllers.Task.update);
    app.routing.delete('/:id', app.middleware.checkToken, app.controllers.Task.delete);
};
