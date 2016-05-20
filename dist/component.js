!function(e){function r(e,r,t){e in i||(i[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return c[e]||(c[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,s=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var s=0;s<i.dependencies.length;++s)i.dependencies[s]===o&&i.setters[s](a)}return o.locked=!1,r},r.name);o.setters=s.setters,o.execute=s.execute;for(var l=0,d=r.normalizedDeps.length;d>l;l++){var f,p=r.normalizedDeps[l],v=i[p],m=c[p];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=u(p),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[l]&&o.setters[l](f)}}}function o(e){var r={};if("object"==typeof e||"function"==typeof e)if(l){var t;for(var n in e)(t=Object.getOwnPropertyDescriptor(e,n))&&f(r,n,t)}else{var o=e&&e.hasOwnProperty;for(var n in e)(!o||e.hasOwnProperty(n))&&(r[n]=e[n])}return r["default"]=e,f(r,"__useDefault",{value:!0}),r}function a(r,t){var n=i[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,l=n.normalizedDeps.length;l>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(i[d]?a(d,t):u(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function u(e){if(v[e])return v[e];if("@node/"==e.substr(0,6))return p(e.substr(6));var r=i[e];if(!r)throw"Module "+e+" not present.";return n(i[e]),a(e,[]),i[e]=void 0,r.declarative&&f(r.module.exports,"__esModule",{value:!0}),v[e]=r.declarative?r.module.exports:r.esModule}var i={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},l=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(d){l=!1}var f;!function(){try{Object.defineProperty({},"a",{})&&(f=Object.defineProperty)}catch(e){f=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var c={},p="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,v={"@empty":{}};return function(e,t,n){return function(a){a(function(a){for(var i=0;i<t.length;i++)(function(e,r){r&&r.__esModule?v[e]=r:v[e]=o(r)})(t[i],arguments[i]);n({register:r});var s=u(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)u(e[i]);return s.__useDefault?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["1"], [], function($__System) {

$__System.register("2", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var component;
  return {
    setters: [],
    execute: function() {
      var component;
      (function(component) {
        'use strict';
        angular.module('component', ['templates']);
        angular.module('templates', []);
      })(component || (component = {}));
    }
  };
});

$__System.register("3", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var component;
  return {
    setters: [],
    execute: function() {
      var component;
      (function(component) {
        function config(componentProvider) {
          componentProvider.configure({test: 'blabla'});
        }
        angular.module('component').config(config);
      })(component || (component = {}));
    }
  };
});

$__System.register("4", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var component;
  return {
    setters: [],
    execute: function() {
      var component;
      (function(component) {
        var ComponentProvider = (function() {
          function ComponentProvider() {
            var _this = this;
            this.config = {debug: true};
            this.$get = function() {
              return {config: _this.config};
            };
          }
          ComponentProvider.prototype.configure = function(config) {
            if (!arguments[0]) {
              return this.config;
            } else {
              angular.extend(this.config, config);
            }
          };
          ComponentProvider.$inject = [];
          return ComponentProvider;
        }());
        component.ComponentProvider = ComponentProvider;
        angular.module('component').provider('component', ComponentProvider);
      })(component || (component = {}));
    }
  };
});

$__System.register("5", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var component;
  return {
    setters: [],
    execute: function() {
      var component;
      (function(component) {
        'use strict';
        var ComponentFilter = (function() {
          function ComponentFilter() {}
          ComponentFilter.instance = function() {
            return new ComponentFilter().filterFn;
          };
          ComponentFilter.prototype.filterFn = function(input) {
            return input ? input + '\u2713' : '\u2718';
          };
          ComponentFilter.$inject = [];
          return ComponentFilter;
        }());
        component.ComponentFilter = ComponentFilter;
        angular.module('component').filter('componentFilter', ComponentFilter.instance);
      })(component || (component = {}));
    }
  };
});

$__System.register("6", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var component;
  return {
    setters: [],
    execute: function() {
      var component;
      (function(component) {
        'use strict';
        var ComponentDirective = (function() {
          function ComponentDirective() {
            this.bindToController = false;
            this.link = this.linkFn;
            this.controller = this.controllerFn;
            this.restrict = 'EA';
            this.templateUrl = 'src/component.html';
            this.scope = {
              event: '&onEvent',
              data: '='
            };
          }
          ComponentDirective.instance = function() {
            return new ComponentDirective();
          };
          ComponentDirective.prototype.controllerFn = function(ComponentService) {
            console.log('Injected service:', ComponentService.index());
          };
          ComponentDirective.prototype.linkFn = function(scope, element, attrs) {
            scope.internalValue = true;
            scope.internalDirectiveMethod = function() {
              scope.internalValue = !scope.internalValue;
            };
          };
          ComponentDirective.$inject = ['ComponentService'];
          return ComponentDirective;
        }());
        angular.module('component').directive('componentDirective', ComponentDirective.instance);
      })(component || (component = {}));
    }
  };
});

$__System.register("7", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var component;
  return {
    setters: [],
    execute: function() {
      var component;
      (function(component) {
        'use strict';
        var ComponentService = (function() {
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
          ComponentService.prototype.index = function() {
            return this.data;
          };
          ComponentService.prototype.byID = function(ID) {
            return this.data.filter(function(item) {
              return item.ID === ID;
            })[0];
          };
          ComponentService.$inject = [];
          return ComponentService;
        }());
        angular.module('component').service('ComponentService', ComponentService);
      })(component || (component = {}));
    }
  };
});

$__System.register("8", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
            exports_1("default",angular.module("templates").run(["$templateCache", function ($templateCache) { $templateCache.put("src/component.html", "<hr />\n<button ng-click=\"event({message: \'from directive\'})\">Trigger outside method (controller)</button>\n<p>\n    Data from the outside: {{data}}\n</p>\n<p>\n    Internal directive data: {{internalValue}}\n    <button ng-click=\"internalDirectiveMethod()\">Trigger internal method</button>\n</p>"); }]));
        }
    }
});

$__System.register("1", ["2", "3", "4", "5", "6", "7", "8"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  return {
    setters: [function(_1) {}, function(_2) {}, function(_3) {}, function(_4) {}, function(_5) {}, function(_6) {}, function(_7) {}],
    execute: function() {}
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