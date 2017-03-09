var assert = require('assert');
var configurable = require('../configurable');

describe('configurable', function () {
    var greet;
    var config = {
        message: 'hello',
        firstname: 'you'
    };

    beforeEach(function () {
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

    it ('should work with literal', function () {
        greeter = configurable({
            greet() {
                return this.config.message + ' ' + this.config.firstname;
            },
            reverse() {
                return this.config.firstname + ' ' + this.config.message;
            }
        }, config);
        assert.equal(greeter.greet(), 'hello you');
        assert.equal(greeter.reverse(), 'you hello');

        var hiGreeter = greeter.message('Hi').firstname('John');

        assert.equal(hiGreeter.message(), 'Hi');
        assert.equal(hiGreeter.firstname(), 'John');
        assert.equal(hiGreeter.greet(), 'Hi John');
        assert.equal(hiGreeter.reverse(), 'John Hi');
    });

    it ('should throw an error wen config would override a target key', function () {
        assert.throws(function () {
            configurable({
                bar() {
                    return this.config.bar;
                },
            }, { bar: 'hello' });
        }, 'config property would override key from target');
    });
});
