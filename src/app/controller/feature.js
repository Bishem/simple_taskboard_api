'use strict';

module.exports = function (app) {
    app.controllers.Feature = {
        findAll: function (req, res, next) {
            app.models.Feature.findAll()
                .then(res.json)
                .catch(next);
        },
        findOne: function (req, res, next) {
            const id = req.params['id'];
            app.models.Feature.findOne({
                    where: {
                        id: id
                    }
                }).then(res.json)
                .catch(next);
        }
    }
};
