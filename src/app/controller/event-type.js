'use strict';

module.exports = function (app) {
    app.controllers.EventType = {
        findAll: function (req, res, next) {
            app.models.EventType.findAll()
                .then(res.json)
                .catch(next);
        },
        findOne: function (req, res, next) {
            const id = req.params['id'];
            app.models.EventType.findOne({
                    where: {
                        id: id
                    }
                }).then(res.json)
                .catch(next);
        }
    }
};

