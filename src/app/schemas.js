'use strict';

module.exports = function (app) {
    const schemas = {};

    schemas.User = {
        email: 'string',
        token: 'string',
        firstname: 'string',
        lastname: 'string',
        initials: 'string',
        isAdmin: 'boolean'
    };

    app.schemas = schemas;
};