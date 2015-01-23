'use strict';

function configurable(targetFunction, config) {

    function configure(item) {
        return function(value) {
            if (!arguments.length) return config[item];
            config[item] = value;

            return targetFunction;
        };
    }

    for (var item in config) {
        targetFunction[item] = configure(item);
    }
}

if('object' == typeof exports && 'undefined' != typeof module) {
    module.exports = configurable;
} else if ('function' == typeof define && define.amd) {
    define([], configurable);
} else {
    window.configurable = configurable;
}
