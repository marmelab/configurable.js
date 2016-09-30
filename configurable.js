'use strict';

function configurable(targetFunction, config) {

    function configure(item) {
        return function(value) {
            if (!arguments.length) return config[item];
            const newConfig = Object.assign({}, config, { [item]: value });

            return configurable(targetFunction, newConfig);
        };
    }

    const configurableFunction = targetFunction.bind({ config: config });

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
