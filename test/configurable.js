var assert = require('assert');
var configurable = require('../configurable');

describe('configurable', function () {
    var greet;

    beforeEach(function () {
        var config = {
            message: 'hello',
            firstname: 'you'
        };

        greet = configurable(function () {
            return this.config.message + ' ' + this.config.firstname;
        }, config);
    });

    it ('should add configuration function for each key in config', function () {
        assert.equal(greet.message(), 'hello');
        assert.equal(greet.firstname(), 'you');
        assert.equal(greet(), 'hello you');

        var hiGreet = greet.message('Hi').firstname('John');

        assert.equal(hiGreet.message(), 'Hi');
        assert.equal(hiGreet.firstname(), 'John');
        assert.equal(hiGreet(), 'Hi John');

        assert.equal(greet.message(), 'hello');
        assert.equal(greet(), 'hello you');
    });
});
