'use strict';

module.exports = function (app) {
    app.controllers.Task = {
        create: function (req, res, next) {
            const task = req.body;
            app.models.Task.create(task)
                .then(res.status(201).json)
                .catch(next);
        },
        findAll: function (req, res, next) {
            app.models.Task.findAll()
                .then(res.json)
                .catch(next);
        },
        findOne: function (req, res, next) {
            const id = req.params['id'];
            app.models.Task.findOne({
                    where: {
                        id: id
                    }
                }).then(res.json)
                .catch(next);
        },
        update: function (req, res, next) {
            const task = req.body;
            app.models.Task.update(task, {
                where: {
                    id: task.id
                }
            }).then(function () {
                res.json({
                    message: 'updated successfully a task with id = ' + id
                });
            }).catch(next);
        },
        delete: function (req, res, next) {
            const id = req.params['id'];
            app.models.Task.destroy({
                where: {
                    id: id
                }
            }).then(function () {
                res.json({
                    message: 'deleted successfully a task with id = ' + id
                });
            }).catch(next);
        },
    }
};

