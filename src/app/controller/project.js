'use strict';

module.exports = function (app) {
    app.controllers.Project = {
        findAll: function (req, res, next) {
            app.models.Project.findAll()
                .then(res.json)
                .catch(next);
        },
        findOne: function (req, res, next) {
            const id = req.params['id'];
            app.models.Project.findOne({
                    where: {
                        id: id
                    }
                }).then(res.json)
                .catch(next);
        }
    }
};
