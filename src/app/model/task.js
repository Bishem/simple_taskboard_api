'use strict';

const types = global.sqlizer.DataTypes;

module.exports = function (app) {
    app.models.Task = global.connection
        .define('Task', {
            id: {
                type: types.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            idState: types.INTEGER,
            idFeature: types.INTEGER,
            title: types.STRING,
            description: types.TEXT,
            difficulties: types.TEXT,
            startedAt: types.DATE,
            endedAt: types.DATE,
            shouldLast: types.TIME,
            lasted: types.TIME
        });

    app.models.Task.associate = function () {
        app.models.Task.hasMany(app.models.Event, {
            foreignKey: 'idTask'
        });
        app.models.Task.belongsTo(app.models.State, {
            foreignKey: 'idState'
        });
        app.models.Task.belongsTo(app.models.Feature, {
            foreignKey: 'idFeature'
        });
    }
};
