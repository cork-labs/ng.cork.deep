describe('ng.cork.deep.path', function () {
    'use strict';

    beforeEach(module('ng.cork.deep.path'));

    describe('corkDeepPath', function () {

        describe('get()', function () {

            it('should throw an error if "path" argument is of an invalid type.', inject(function (corkDeepPath) {

                expect(function () {
                    corkDeepPath.get({}, []);
                }).toThrow(new Error('Invalid property path.'));
            }));

            it('should retrieve all the existing properties if no path provided.', inject(function (corkDeepPath) {

                var obj = {
                    foo: {
                        bar: 42
                    },
                    baz: 99
                };

                var expected = angular.copy(obj);
                expect(corkDeepPath.get(obj)).toEqual(expected);
            }));

            it('should retrieve existing properties by path.', inject(function (corkDeepPath) {

                var obj = {
                    foo: {
                        bar: 42
                    }
                };

                expect(corkDeepPath.get(obj, 'foo.bar')).toBe(42);
            }));

            it('should clone the data before returning and modifying the data should not modifythe obj.', inject(function (corkDeepPath) {

                var obj = {
                    foo: {
                        bar: 'baz'
                    }
                };

                var foo = corkDeepPath.get(obj, 'foo');

                foo.bar = 'qux';

                expect(corkDeepPath.get(obj, 'foo.bar')).toBe('baz');
            }));

            it('should throw an error if data is not defined.', inject(function (corkDeepPath) {

                expect(function () {
                    corkDeepPath.get({}, 'qux');
                }).toThrow(new Error('Path "qux" is not defined.'));
            }));

            describe('when a default value is provided', function () {

                it('should still throw an error if data is not defined.', inject(function (corkDeepPath) {

                    var obj = {
                        foo: {
                            bar: {
                                baz: 42
                            }
                        }
                    };

                    expect(function () {
                        corkDeepPath.get(obj, 'foo.qux.quux', 'default');
                    }).toThrow(new Error('Path "foo.qux.quux" is not defined.'));
                }));

                it('should return the provided default if final property is not defined.', inject(function (corkDeepPath) {

                    var obj = {
                        foo: {
                            bar: 42
                        }
                    };

                    expect(corkDeepPath.get(obj, 'foo.bar.baz', 'default')).toBe('default');
                }));
            });
            // corkDeepPath.get(obj, 'foo.bar'); // 'baz'
            // corkDeepPath.get(obj, 'foo.foo'); // Error()
            // corkDeepPath.get(obj, 'foo.foo', 'default value'); // 'default value'
        });

        describe('set()', function () {

            it('should throw an error if "path" argument is of an invalid type.', inject(function (corkDeepPath) {

                expect(function () {
                    corkDeepPath.set({}, []);
                }).toThrow(new Error('Invalid property path.'));
            }));

            it('should store the provided data in the object.', inject(function (corkDeepPath) {

                var obj = {
                    foo: {}
                };

                corkDeepPath.set(obj, 'foo.bar', 42);

                expect(corkDeepPath.get(obj, 'foo.bar')).toBe(42);
            }));

            it('should override existing objects with scalars.', inject(function (corkDeepPath) {

                var obj = {
                    foo: {
                        bar: {}
                    }
                };

                corkDeepPath.set(obj, 'foo', 42);

                expect(corkDeepPath.get(obj, 'foo')).toBe(42);
                expect(corkDeepPath.get(obj, 'foo.bar', 'empty')).toBe('empty');
            }));

            it('should override existing scalars with objects.', inject(function (corkDeepPath) {

                var obj = {
                    foo: 42
                };

                corkDeepPath.set(obj, 'foo.bar', 42);

                expect(corkDeepPath.get(obj, 'foo.bar')).toBe(42);
            }));

            it('should clone provided data and modifying it after set() should modify the object', inject(function (corkDeepPath) {

                var obj = {};
                var data = {
                    bar: 'baz'
                };

                corkDeepPath.set(obj, 'foo', data);

                data.bar = 'qux';

                expect(corkDeepPath.get(obj, 'foo.bar')).toBe('baz');

                corkDeepPath.set(obj, 'foo.bar', 'quux');

                expect(data.bar).toBe('qux');
            }));
            // corkDeepPath.set(obj, 'foo.bar', 'replaced'); // obj.foo.bar = 'replaced'
            // corkDeepPath.set(obj, 'foo.qux', 'new value'); // obj.foo.qux = 'new value'
            // corkDeepPath.set(obj, 'abc.def', 'new property'); // obj.abc.def = 'new property'
        });

        describe('del()', function () {

            // corkDeepPath.del(obj, 'foo'); // obj.foo = undefined, obj = {baz: [101]}
        });
    });
});
