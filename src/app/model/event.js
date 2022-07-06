'use strict';

const types = global.sqlizer.DataTypes;

module.exports = function (app) {
    app.models.Event = global.connection
        .define('Event', {
            id: {
                type: types.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            idEventType: types.INTEGER,
            idTask: types.INTEGER,
            idUser: types.INTEGER,
            description: types.TEXT
        });

    app.models.Event.associate = function () {
        app.models.Event.belongsTo(app.models.EventType, {
            foreignKey: 'idEventType'
        });
        app.models.Event.belongsTo(app.models.Task, {
            foreignKey: 'idTask'
        });
        app.models.Event.belongsTo(app.models.User, {
            foreignKey: 'idUser'
        });
    }
};
