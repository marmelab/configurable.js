Configurable
============

Make a function configurable

Configurable functions modify their configuration.
The configuration is available from the function context `this`

```js

function bar() {
    console.log('foo value is', this.config.foo);
}

bar.bind({ congig: { foo: 1 } })(); // 'foo value is 1'
config.foo = 3;
bar.bind({ congig: { foo: 3 } })(); // 'foo value is 3'
```
The configurable behavior modifies the function object, adding one
method for each item in the configuration.

The added methods use the same name as the configuration items. The
added methods are both setters and getters, which means that they return
the config value when called without argument, and they modify the
config value when called with an argument.

Additionally each config change create a new configured function.
This way it is easy to have several copy of the same function with different configuration.

```js
bar1 = configurable(bar, { foo: 1 });

// Now bar has a foo() method
bar1.foo(); // 1
bar1(); // 'foo value is 1'

var bar2 = bar1.foo(2)
bar2(); // 'foo value is 2'
bar2.foo(); // 2

// but bar1 stay the same
bar1.foo(); // 1
bar1(); // 'foo value is 1'
```
