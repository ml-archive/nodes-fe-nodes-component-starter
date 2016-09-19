!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1"], [], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("2", [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("default", angular.module("templates", []).run(["$templateCache", function ($templateCache) {
                $templateCache.put('src/component.html', '<div class="component">\n    <button class="button success" ng-click="ComponentDirective.event({message: \'from directive\'})">Trigger outside method (controller)</button>\n    <p>\n        Data from the outside: {{ComponentDirective.data}}\n    </p>\n    <p>\n        Internal directive data: {{internalValue}}\n        <button class="button" ng-click="internalDirectiveMethod()">Trigger internal method</button>\n    </p>\n</div>');
            }]));
        }
    };
});
$__System.register('3', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var component;
    return {
        setters: [],
        execute: function () {
            var component;
            (function (component) {
                'use strict';

                var dependencies = ['templates'];
                angular.module('component', dependencies);
            })(component || (component = {}));
        }
    };
});
$__System.register('4', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var component;
    return {
        setters: [],
        execute: function () {
            var component;
            (function (component) {
                config.$inject = ['componentProvider'];
                function config(componentProvider) {
                    componentProvider.configure({ test: 'Testing Configure Function' });
                }
                angular.module('component').config(config);
            })(component || (component = {}));
        }
    };
});
$__System.register('5', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var component;
    return {
        setters: [],
        execute: function () {
            var component;
            (function (component) {
                var ComponentProvider = function () {
                    function ComponentProvider() {
                        var _this = this;
                        this.config = {
                            debug: true
                        };
                        this.$get = function () {
                            return { config: _this.config };
                        };
                    }
                    ComponentProvider.prototype.configure = function (config) {
                        if (!arguments[0]) {
                            return this.config;
                        } else {
                            angular.extend(this.config, config);
                        }
                    };
                    ComponentProvider.$inject = [];
                    return ComponentProvider;
                }();
                component.ComponentProvider = ComponentProvider;
                angular.module('component').provider('component', ComponentProvider);
            })(component || (component = {}));
        }
    };
});
$__System.register('6', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var component;
    return {
        setters: [],
        execute: function () {
            var component;
            (function (component) {
                'use strict';

                var ComponentFilter = function () {
                    function ComponentFilter() {}
                    ComponentFilter.instance = function () {
                        return new ComponentFilter().filterFn;
                    };
                    ComponentFilter.prototype.filterFn = function (input) {
                        return input ? input + '\u2713' : '\u2718';
                    };
                    ComponentFilter.$inject = [];
                    return ComponentFilter;
                }();
                component.ComponentFilter = ComponentFilter;
                angular.module('component').filter('componentFilter', ComponentFilter.instance);
            })(component || (component = {}));
        }
    };
});
$__System.register('7', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var component;
    return {
        setters: [],
        execute: function () {
            var component;
            (function (component) {
                'use strict';

                var ComponentService = function () {
                    function ComponentService() {
                        this.data = [{
                            'ID': 1,
                            'title': 'dummy 1'
                        }, {
                            'ID': 2,
                            'title': 'dummy 2'
                        }, {
                            'ID': 3,
                            'title': 'dummy 3'
                        }];
                    }
                    ComponentService.prototype.index = function () {
                        return this.data;
                    };
                    ComponentService.prototype.byID = function (ID) {
                        return this.data.filter(function (item) {
                            return item.ID === ID;
                        })[0];
                    };
                    ComponentService.$inject = [];
                    return ComponentService;
                }();
                angular.module('component').service('ComponentService', ComponentService);
            })(component || (component = {}));
        }
    };
});
$__System.register('8', [], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    var component;
    return {
        setters: [],
        execute: function () {
            var component;
            (function (component) {
                'use strict';

                var ComponentDirective = function () {
                    function ComponentDirective() {
                        this.bindToController = true;
                        this.link = this.linkFn;
                        this.controller = ComponentDirectiveController;
                        this.restrict = 'EA';
                        this.templateUrl = 'src/component.html';
                        this.controllerAs = 'ComponentDirective';
                        this.scope = {
                            event: '&onEvent',
                            data: '='
                        };
                    }
                    ComponentDirective.instance = function () {
                        return new ComponentDirective();
                    };
                    ComponentDirective.prototype.linkFn = function (scope, element, attrs) {
                        scope.internalValue = true;
                        scope.internalDirectiveMethod = function () {
                            scope.internalValue = !scope.internalValue;
                        };
                    };
                    ComponentDirective.$inject = [];
                    return ComponentDirective;
                }();
                var ComponentDirectiveController = function () {
                    function ComponentDirectiveController(ComponentService) {
                        this.ComponentService = ComponentService;
                        console.log('Injected service:', this.ComponentService.index());
                    }
                    ComponentDirectiveController.$inject = ['ComponentService'];
                    return ComponentDirectiveController;
                }();
                angular.module('component').directive('componentDirective', ComponentDirective.instance);
            })(component || (component = {}));
        }
    };
});
$__System.register('1', ['2', '3', '4', '5', '6', '7', '8'], function (exports_1, context_1) {
    "use strict";

    var __moduleName = context_1 && context_1.id;
    return {
        setters: [function (_1) {}, function (_2) {}, function (_3) {}, function (_4) {}, function (_5) {}, function (_6) {}, function (_7) {}],
        execute: function () {}
    };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});
//# sourceMappingURL=component.js.map