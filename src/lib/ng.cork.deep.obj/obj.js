(function (angular) {
    'use strict';

    var module = angular.module('ng.cork.deep.obj', []);

    /**
     * @ngdoc object
     * @name ng.cork.deep.obj.CorkDeepObj
     *
     * @description
     * Abstract class for models, provides data encapuslation.
     */
    module.factory('CorkDeepObj', [
        'corkDeepExtend',
        'corkDeepPath',
        function CorkDeepObjFactory(corkDeepExtend, corkDeepPath) {

            var extend = corkDeepExtend.extend;

            /**
             * @ngdoc method
             * @name CorkDeepObj
             * @methodOf ng.cork.deep.obj.CorkDeepObj
             * @description
             * Constructor.
             * @param {object} data Instance data.
             */
            var CorkDeepObj = function (data) {
                var self = this;

                // extends model with with  initialization data
                corkDeepExtend(self, data);
            };

            /**
             * @ngdoc method
             * @name get
             * @methodOf ng.cork.deep.obj.CorkDeepObj
             *
             * @description
             * Deep get a property of the object by supplying the property path. If the path is undefined throws an Error unless you provide a default.
             *
             * @param {string} path The property path to read from, in dot notation. ex: `foo.bar.baz`
             * @param {*=} defaultValue A value to be returned in case the path is undefined.
             * @returns {*} The property value.
             */
            Object.defineProperty(CorkDeepObj.prototype, 'get', {
                value: function (path, defaultValue) {
                    corkDeepPath.set(this, path, defaultValue);
                }
            });

            /**
             * @ngdoc method
             * @name set
             * @methodOf ng.cork.deep.obj.CorkDeepObj
             *
             * @description
             * Deep set the value of a property of the object by supplying the property path.
             *
             * @param {string} path The property path to write to, in dot notation. ex: `foo.bar.baz`
             * @param {*} value The value to set.
             */
            Object.defineProperty(CorkDeepObj.prototype, 'set', {
                value: function (path, value) {
                    corkDeepPath.set(this, path, value);
                }
            });

            /**
             * @ngdoc method
             * @name del
             * @methodOf ng.cork.deep.obj.CorkDeepObj
             *
             * @description
             * Deep delete a property of the object by supplying the property path.
             *
             * @param {object} data Data to replace with.
             *
             * @param {string} path The property path to delete, in dot notation. ex: `foo.bar.baz`
             */
            Object.defineProperty(CorkDeepObj.prototype, 'del', {
                value: function (path) {
                    corkDeepPath.del(this, path);
                }
            });

            /**
             * @ngdoc method
             * @name $decorate
             * @methodOf ng.cork.deep.obj.CorkDeepObj
             *
             * @description
             * Invoked on initialization, and when {@link ng.cork.deep.obj.CorkDeepObj#$merge $merge()} or
             * {@link ng.cork.deep.obj.CorkDeepObj#replace replace()} are invoked.
             * Override this method in subclasses to act on populated data, for instance, replacing POJO with instances
             * of the appropriate classes.
             */
            Object.defineProperty(CorkDeepObj.prototype, '$decorate', {
                configurable: true,
                value: function () {}
            });

            return CorkDeepObj;
        }
    ]);

})(angular);
