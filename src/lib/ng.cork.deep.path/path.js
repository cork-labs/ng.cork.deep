(function (angular) {
    'use strict';

    var module = angular.module('ng.cork.deep.path', []);

    var copy = angular.copy;

    /**
     * @ngdoc service
     * @name ng.cork.deep.path.corkDeepPath
     *
     * @description
     * Provides an extension function
     */
    module.service('corkDeepPath', [

        function corkDeepPathFactory() {

            var CorkDeepPath = function () {
                var self = this;

                /**
                 * @ngdoc function
                 * @name get
                 * @methodOf ng.cork.deep.path.corkDeepPath
                 *
                 * @description
                 * Deep get an object property by supplying the property path. If the path is undefined throws an Error unless you provide a default.
                 *
                 * @param {object} obj The object to read from.
                 * @param {string} path The property path to read from, in dot notation. ex: `foo.bar.baz`
                 * @param {*=} defaultValue A value to be returned in case the path is undefined.
                 * @returns {*} The property value.
                 */
                self.get = function get(obj, path, defaultValue) {
                    var parts;
                    var value = obj;
                    var key;
                    var args;

                    if (angular.isUndefined(path) || angular.isString(path)) {
                        parts = path ? path.split('.') : [];
                        while (parts.length && value) {
                            key = parts.shift();
                            if (value.hasOwnProperty(key)) {
                                value = value[key];
                            } else {
                                // the whole path is consumed and a defaultValue was provided
                                if (!parts.length && arguments.length > 2) {
                                    return defaultValue;
                                } else {
                                    throw new Error('Path "' + path + '" is not defined.');
                                }
                            }
                        }
                    } else {
                        throw new Error('Invalid property path.');
                    }

                    return 'object' === typeof value ? angular.copy(value) : value;
                };

                /**
                 * @ngdoc function
                 * @name set
                 * @methodOf ng.cork.deep.path.corkDeepPath
                 *
                 * @description
                 * Deep set the value of an object property by supplying the property path.
                 *
                 * @param {object} obj The object to write to.
                 * @param {string} path The property path to write to, in dot notation. ex: `foo.bar.baz`
                 * @param {*} value The value to set.
                 */
                self.set = function set(obj, path, value) {
                    var parts;
                    var val = obj;
                    var key;

                    if (angular.isString(path)) {
                        parts = path.split('.');
                        while (parts.length > 1 && val) {
                            key = parts.shift();
                            if (!val.hasOwnProperty(key) || typeof val[key] !== 'object') {
                                val[key] = {};
                            }
                            val = val[key];
                        }

                        key = parts.shift();
                        val[key] = 'object' === typeof value ? copy(value) : value;
                    } else {
                        throw new Error('Invalid property path.');
                    }
                };

                /**
                 * @ngdoc function
                 * @name del
                 * @methodOf ng.cork.deep.path.corkDeepPath
                 *
                 * @description
                 * Deep delete an object property by supplying the property path.
                 *
                 * @param {object} obj The object to write to.
                 * @param {string} path The property path to delete, in dot notation. ex: `foo.bar.baz`
                 */
                self.del = function del(obj, path) {

                };
            };

            return new CorkDeepPath();
        }
    ]);

})(angular);
