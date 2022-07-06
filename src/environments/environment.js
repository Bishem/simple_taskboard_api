'use strict';

const environments = {
        prod: require('./environment.prod'),
        dev: require('./environment.dev')
    };

module.exports = function (options) {

    console.log('getting env');

    return {environment: environments[options.env](options).environment};
};
