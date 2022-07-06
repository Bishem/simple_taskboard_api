'use strict';

const types = global.sqlizer.DataTypes;

module.exports = function (app) {
    app.models.State = global.connection
        .define('State', {
            id: {
                type: types.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            label: types.STRING
        });

    app.models.State.associate = function () {
        app.models.State.hasMany(app.models.Project, {
            foreignKey: 'idState'
        });
        app.models.State.hasMany(app.models.Feature, {
            foreignKey: 'idState'
        });
        app.models.State.hasMany(app.models.Task, {
            foreignKey: 'idState'
        });
    }
};
