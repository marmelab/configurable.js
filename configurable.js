'use strict';

function bind(data, config) {
    if (typeof data === 'function') {
        return data.bind(config);
    }
    if (typeof data === 'object') {
        return Object.keys(data).reduce(function (result, key) {
            return Object.assign({}, result, { [key]: bind(data[key], config) });
        }, {});
    }
    return data;
}

function checkConflict(target, config) {
    const configKeys = Object.keys(config);
    configKeys.forEach(key => {
        if (target[key]) {
            throw new Error('config property would override key from target');
        }
    });
}

function configurable(targetFunction, config) {
    checkConflict(targetFunction, config);
    function configure(item) {
        return function(value) {
            if (!arguments.length) return config[item];
            const newConfig = Object.assign({}, config, { [item]: value });

            return configurable(targetFunction, newConfig);
        };
    }

    const configurableFunction = bind(targetFunction, { config: config });

    for (var item in config) {
        configurableFunction[item] = configure(item);
    }

    return configurableFunction;
}

if('object' == typeof exports && 'undefined' != typeof module) {
    module.exports = configurable;
} else if ('function' == typeof define && define.amd) {
    define([], configurable);
} else {
    window.configurable = configurable;
}
