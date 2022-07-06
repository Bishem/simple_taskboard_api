'use strict';

module.exports = function (app) {
    app.controllers.Event = {
        findAll: function (req, res, next) {
            app.models.Event.findAll()
                .then(res.json)
                .catch(next);
        },
        findOne: function (req, res, next) {
            const id = req.params['id'];
            app.models.Event.findOne({
                    where: {
                        id: id
                    }
                }).then(res.json)
                .catch(next);
        }
    };
};
