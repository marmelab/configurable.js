var assert = require('assert');
var configurable = require('../configurable');

describe('configurable', function () {
    it ('should configure given function', function () {
        var config = {
            message: 'hello'
        };

        var greet = function () {
            return config.message;
        };

        configurable(greet, config);

        assert.equal(greet.message(), 'hello');
        assert.equal(greet(), 'hello');

        greet.message('Hi');

        assert.equal(greet.message(), 'Hi');
        assert.equal(greet(), 'Hi');
    });
});
