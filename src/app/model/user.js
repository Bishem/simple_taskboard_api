'use strict';

const crypt = require('password-hash'),
    types = global.sqlizer.DataTypes,
    _ = require('lodash');

module.exports = function (app) {
    app.models.User = global.connection
        .define('User', {
            id: {
                type: types.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstname: types.STRING,
            lastname: types.STRING,
            password: types.STRING,
            email: {
                type: types.STRING,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            initials: types.STRING,
            isAdmin: types.BOOLEAN
        }, {
            hooks: {
                beforeSave: function (user) {
                    if (!_.isEmpty(user.password)) user.password = crypt.generate(user.password, )
                }
            }
        });

    app.models.User.associate = function () {
        app.models.User.hasMany(app.models.Event, {
            foreignKey: 'idUser'
        });
    };

    app.models.User.prototype.verifyPassword = function (password) {
        return crypt.verify(password, this.password);
    };

    app.models.User.prototype.verifyEmail = function (email) {
        return _.isEqual(email, this.email);
    };

    app.models.User.prototype.authenticate = function (email, password) {
        return this.verifyEmail(email) && this.verifyPassword(password);
    };
};
