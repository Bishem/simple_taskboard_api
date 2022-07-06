'use strict';

module.exports = function (app) {
    app.controllers.State = {
        findAll: function (req, res, next) {
            app.models.State.findAll()
                .then(res.json)
                .catch(next);
        },
        findOne: function (req, res, next) {
            const id = req.params['id'];
            app.models.State.findOne({
                    where: {
                        id: id
                    }
                }).then(res.json)
                .catch(next);
        }
    }
};
