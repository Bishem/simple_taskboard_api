'use strict';

const types = global.sqlizer.DataTypes;

module.exports = function (app) {
    app.models.EventType = global.connection
        .define('EventType', {
            id: {
                type: types.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            label: types.STRING
        });

    app.models.EventType.associate = function () {
        app.models.EventType.hasMany(app.models.Event, {
            foreignKey: 'idEventType'
        });
    }
};
