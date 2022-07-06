'use strict';

const types = global.sqlizer.DataTypes;

module.exports = function (app) {
    app.models.Project = global.connection
        .define('Project', {
            id: {
                type: types.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            idState: types.INTEGER,
            title: types.STRING,
            description: types.TEXT,
            startedAt: types.DATE,
            shouldEndAt: types.DATE,
            endedAt: types.DATE
        });

    app.models.Project.associate = function () {
        app.models.Project.hasMany(app.models.Feature, {
            foreignKey: 'idProject'
        });
        app.models.Project.belongsTo(app.models.State, {
            foreignKey: 'idState'
        });
    }
};
