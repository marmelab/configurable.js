"use strict";

function configurable(targetFunction, config, listeners) {

    listeners = listeners || {};

    function configure(item) {
        return function(value) {
            if (!arguments.length) return config[item];
            config[item] = value;
            if (listeners.hasOwnProperty(item)) {
                listeners[item](value);
            }

            return targetFunction;
        };
    }

    for (var item in config) {
        targetFunction[item] = configure(item); // for doesn't create a closure, forcing it
    }
}
