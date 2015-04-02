describe('ng.cork.deep.obj', function () {
    'use strict';

    beforeEach(module('ng.cork.deep.obj'));

    describe('CorkDeepObj', function () {

        describe('Constructor', function () {});

        describe('get()', function () {

            // corkDeepPath.get(obj, 'foo.bar'); // 'baz'
            // corkDeepPath.get(obj, 'foo.foo'); // Error()
            // corkDeepPath.get(obj, 'foo.foo', 'default value'); // 'default value'
        });

        describe('set()', function () {

            // corkDeepPath.set(obj, 'foo.bar', 'replaced'); // obj.foo.bar = 'replaced'
            // corkDeepPath.set(obj, 'foo.qux', 'new value'); // obj.foo.qux = 'new value'
            // corkDeepPath.set(obj, 'abc.def', 'new property'); // obj.abc.def = 'new property'
        });

        describe('del()', function () {

            // corkDeepPath.del(obj, 'foo'); // obj.foo = undefined, obj = {baz: [101]}
        });

    });

});
