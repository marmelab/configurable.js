Configurable
============

Make a function configurable

Configurable functions modify their configuration. The configuration
must be an object defined in the function closure.

``` js
var config = {
    foo: 1
};

function bar() {
    console.log('foo value is', config.foo);
}

bar(); // 'foo value is 1'
config.foo = 3;
bar(); // 'foo value is 3'
```
The configurable behavior modifies the function object, adding one
method for each item in the configuration.

The added methods use the same name as the configuration items. The
added methods are both setters and getters, which means that they return
the config value when called without argument, and they modify the
config value when called with an argument.

``` js
configurable(bar, config);

// Now bar has a foo() method

bar.foo(2)
bar(); // 'foo value is 2'
bar.foo(); // 2
```
