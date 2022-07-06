'use strict';

const types = global.sqlizer.DataTypes;

module.exports = function (app) {
    app.models.Feature = global.connection
        .define('Feature', {
            id: {
                type: types.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            idState: types.INTEGER,
            idProject: types.INTEGER,
            title: types.STRING,
            description: types.TEXT,
            startedAt: types.DATE,
            endedAt: types.DATE,
            shouldLast: types.TIME,
            lasted: types.TIME
        });

    app.models.Feature.associate = function () {
        app.models.Feature.hasMany(app.models.Task, {
            foreignKey: 'idFeature'
        });
        app.models.Feature.belongsTo(app.models.State, {
            foreignKey: 'idState'
        });
        app.models.Feature.belongsTo(app.models.Project, {
            foreignKey: 'idProject'
        });
    }
};
