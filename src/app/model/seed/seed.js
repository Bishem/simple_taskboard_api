'use strict';

const EVENTS = require('./events')(),
    FEATURES = require('./features')(),
    PROJECTS = require('./projects')(),
    STATES = require('./states')(),
    EVENT_TYPES = require('./event-types')(),
    TASKS = require('./tasks')(),
    USERS = require('./users')();

module.exports = {
    insert: async function (models) {
        await models.EventType.bulkCreate(EVENT_TYPES);
        await models.State.bulkCreate(STATES);
        await models.User.bulkCreate(USERS, {
            individualHooks: true
        });
        await models.Project.bulkCreate(PROJECTS);
        await models.Feature.bulkCreate(FEATURES);
        await models.Task.bulkCreate(TASKS);
        await models.Event.bulkCreate(EVENTS);
    }
};

