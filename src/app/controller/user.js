'use strict';

module.exports = function (app) {
    app.controllers.User = {
        authMe: function (req, res, next) {

            console.log('auth me body', req.body);

            const userEmail = req.body['email'];
            app.models.User.findOne({
                    where: {
                        email: userEmail
                    }
                }).then(res.json)
                .catch(next);
        },
        logIn: function (req) {

            console.log('log in body', req.body);

            const userEmail = req.body['email'];
            return app.models.User.findOne({
                where: {
                    email: userEmail
                }
            });
        },
        signUp: function (req) {

            console.log('sign up body', req.body);

            const user = req.body;
            return app.models.User.create(user, {
                individualHooks: true
            });
        },
        update: function (req, res, next) {
            const user = req.body;
            app.models.User.update(user, {
                where: {
                    id: user.id
                },
                individualHooks: true
            }).then(function () {
                res.json({
                    message: 'updated successfully a user with id = ' + id
                });
            }).catch(next);
        },
        signOut: function (req, res, next) {
            const userId = req.params['id'];
            app.models.User.destroy({
                where: {
                    id: userId
                }
            }).then(function () {
                res.json({
                    message: 'deleted successfully a user with id = ' + id
                });
            }).catch(next);
        },
    }
};

