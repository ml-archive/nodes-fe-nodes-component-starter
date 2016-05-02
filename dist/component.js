!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in p||(p[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==v.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=p[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(v.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=p[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return x[e]||(x[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=p[s],v=x[s];v?l=v.exports:c&&!c.declarative?l=c.esModule:c?(d(c),v=c.module,l=v.exports):l=f(s),v&&v.importers?(v.importers.push(t),t.dependencies.push(v)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=p[e];if(t)t.declarative?c(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=f(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=p[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){if(r===e)return r;var t={};if("object"==typeof r||"function"==typeof r)if(g){var n;for(var o in r)(n=Object.getOwnPropertyDescriptor(r,o))&&h(t,o,n)}else{var a=r&&r.hasOwnProperty;for(var o in r)(!a||r.hasOwnProperty(o))&&(t[o]=r[o])}return t["default"]=r,h(t,"__useDefault",{value:!0}),t}function c(r,t){var n=p[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==v.call(t,u)&&(p[u]?c(u,t):f(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function f(e){if(D[e])return D[e];if("@node/"==e.substr(0,6))return y(e.substr(6));var r=p[e];if(!r)throw"Module "+e+" not present.";return a(e),c(e,[]),p[e]=void 0,r.declarative&&h(r.module.exports,"__esModule",{value:!0}),D[e]=r.declarative?r.module.exports:r.esModule}var p={},v=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},g=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(m){g=!1}var h;!function(){try{Object.defineProperty({},"a",{})&&(h=Object.defineProperty)}catch(e){h=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var x={},y="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,D={"@empty":{}};return function(e,n,o){return function(a){a(function(a){for(var u={_nodeRequire:y,register:r,registerDynamic:t,get:f,set:function(e,r){D[e]=r},newModule:function(e){return e}},d=0;d<n.length;d++)(function(e,r){r&&r.__esModule?D[e]=r:D[e]=s(r)})(n[d],arguments[d]);o(u);var i=f(e[0]);if(e.length>1)for(var d=1;d<e.length;d++)f(e[d]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)

(["1"], [], function($__System) {

!function(e){function r(e,r){for(var n=e.split(".");n.length;)r=r[n.shift()];return r}function n(n){if("string"==typeof n)return r(n,e);if(!(n instanceof Array))throw new Error("Global exports must be a string or array.");for(var t={},o=!0,f=0;f<n.length;f++){var i=r(n[f],e);o&&(t["default"]=i,o=!1),t[n[f].split(".").pop()]=i}return t}function t(r){if(Object.keys)Object.keys(e).forEach(r);else for(var n in e)a.call(e,n)&&r(n)}function o(r){t(function(n){if(-1==l.call(s,n)){try{var t=e[n]}catch(o){s.push(n)}r(n,t)}})}var f,i=$__System,a=Object.prototype.hasOwnProperty,l=Array.prototype.indexOf||function(e){for(var r=0,n=this.length;n>r;r++)if(this[r]===e)return r;return-1},s=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];i.set("@@global-helpers",i.newModule({prepareGlobal:function(r,t,i){var a=e.define;e.define=void 0;var l;if(i){l={};for(var s in i)l[s]=e[s],e[s]=i[s]}return t||(f={},o(function(e,r){f[e]=r})),function(){var r;if(t)r=n(t);else{r={};var i,s;o(function(e,n){f[e]!==n&&"undefined"!=typeof n&&(r[e]=n,"undefined"!=typeof i?s||i===n||(s=!0):i=n)}),r=s?r:i}if(l)for(var u in l)e[u]=l[u];return e.define=a,r}}}))}("undefined"!=typeof self?self:global);
$__System.registerDynamic("2", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    'use strict';
    (function() {
      'use strict';
      angular.module('Testing', ['templates']);
      angular.module('templates', []);
    })();
  })();
  return _retrieveGlobal();
});

$__System.registerDynamic("3", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    'use strict';
    (function() {
      'use strict';
      angular.module('Testing').directive('testingDirective', TestingDirective);
      function TestingDirective() {
        return {
          restrict: 'EA',
          link: link,
          scope: {
            event: '&onEvent',
            data: '='
          },
          templateUrl: 'src/testing.template.html'
        };
        function link(scope, element, attrs) {
          scope.internalValue = true;
          scope.internalDirectiveMethod = function() {
            scope.internalValue = !scope.internalValue;
          };
        }
      }
    })();
  })();
  return _retrieveGlobal();
});

$__System.registerDynamic("4", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    'use strict';
    (function() {
      'use strict';
      angular.module('Testing').service('TestingService', TestingService);
      function TestingService() {
        var response = {'data': [{
            'ID': 1,
            'title': 'dummy 1'
          }, {
            'ID': 2,
            'title': 'dummy 2'
          }, {
            'ID': 3,
            'title': 'dummy 3'
          }]};
        var data = response.data;
        return {
          index: index,
          byID: byID
        };
        function index() {
          return data;
        }
        function byID(ID) {
          return data.filter(function(item) {
            return item.ID === ID;
          })[0];
        }
      }
    })();
  })();
  return _retrieveGlobal();
});

$__System.register("5", [], function($__export) {
  "use strict";
  return {
    setters: [],
    execute: function() {
      $__export('default', angular.module("templates").run(["$templateCache", function($templateCache) {
        $templateCache.put("src/testing.template.html", "<button ng-click=\"event({message: \'from directive\'})\">Trigger outside method (controller)</button>\n<p>\n    Data from the outside: {{data}}\n</p>\n<p>\n    Internal directive data: {{internalValue}}\n    <button ng-click=\"internalDirectiveMethod()\">Trigger internal method</button>\n</p>");
      }]));
    }
  };
});

$__System.registerDynamic("1", ["2", "3", "4", "5"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var _testingModule = $__require('2');
  var _testingModule2 = _interopRequireDefault(_testingModule);
  var _testingDirective = $__require('3');
  var _testingDirective2 = _interopRequireDefault(_testingDirective);
  var _testingService = $__require('4');
  var _testingService2 = _interopRequireDefault(_testingService);
  var _templates = $__require('5');
  var _templates2 = _interopRequireDefault(_templates);
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {default: obj};
  }
  return module.exports;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3RtcC90ZXN0aW5nLm1vZHVsZS5qcyIsIi4uL3RtcC90ZXN0aW5nLmRpcmVjdGl2ZS5qcyIsIi4uL3RtcC90ZXN0aW5nLnNlcnZpY2UuanMiLCIuLi90bXAvdGVtcGxhdGVzLmpzIiwiLi4vdG1wL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsUUFBUSxnQkFBZ0IsQUFBQyxDQUFDLEdBQUUsQ0FBRyxHQUFDLENBQUcsTUFBSSxDQUFHLFVBQVMsVUFBUyxDQUFHLENBQUEsVUFBUyxDQUFHLENBQUEsU0FBUSxDQUFHO0FBQ3RGLEFBQUksSUFBQSxDQUFBLGVBQWMsRUFBSSxDQUFBLFNBQVEsSUFBSSxBQUFDLENBQUMsa0JBQWlCLENBQUMsY0FBYyxBQUFDLENBQUMsU0FBUSxHQUFHLENBQUcsS0FBRyxDQUFHLEtBQUcsQ0FBQyxDQUFDO0FBQzdGLFdBRk0sQUFBQztBQUFULGVBQVcsQ0FBQztBQUVaLElBQUMsU0FBUyxBQUFDLENBQUU7QUFDWixpQkFBVyxDQUFDO0FBRVosWUFBTSxPQUFPLEFBQUMsQ0FBQyxTQUFRLENBQUcsRUFBQyxXQUFVLENBQUMsQ0FBQyxDQUFDO0FBTXhDLFlBQU0sT0FBTyxBQUFDLENBQUMsV0FBVSxDQUFHLEdBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQUFBQyxFQUFDLENBQUM7R0FWZ0IsQUFBQyxFQUFDLENBQUM7QUFDckIsT0FBTyxDQUFBLGVBQWMsQUFBQyxFQUFDLENBQUM7QUFDMUIsQ0FBQyxDQUFDO0FBUUU7QUNaSixRQUFRLGdCQUFnQixBQUFDLENBQUMsR0FBRSxDQUFHLEdBQUMsQ0FBRyxNQUFJLENBQUcsVUFBUyxVQUFTLENBQUcsQ0FBQSxVQUFTLENBQUcsQ0FBQSxTQUFRLENBQUc7QUFDdEYsQUFBSSxJQUFBLENBQUEsZUFBYyxFQUFJLENBQUEsU0FBUSxJQUFJLEFBQUMsQ0FBQyxrQkFBaUIsQ0FBQyxjQUFjLEFBQUMsQ0FBQyxTQUFRLEdBQUcsQ0FBRyxLQUFHLENBQUcs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QUFDLENBQUM7QUFFOUQsQUFBSSxJQUFBLENBQUEsVUFBUyxFQWRiLENBQUEsVUFBUyxBQUFDLENBQUMsR0FBRSxDQUFDLEFBYzJCLENBQUM7QUFFMUMsQUFBSSxJQUFBLENBQUEsV0FBVSxFQUFJLENBQUEsc0JBQXFCLEFBQUMsQ0FBQyxVQUFTLENBQUMsQ0FBQztBQUVwRCxTQUFTLHVCQUFxQixDQUFFLEdBQUUsQ0FBRztBQUFFLFNBQU8sQ0FBQSxHQUFFLEdBQUssQ0FBQSxHQUFFLFdBQVcsQ0FBQSxDQUFJLElBQUUsRUFBSSxFQUFFLE9BQU0sQ0FBRyxJQUFFLENBQUUsQ0FBQztFQUFFO0FBbEI5RixBQWtCOEYsT0FsQnZGLENBQUEsTUFBSyxRQUFRLENBQUM7QUFBMkYsQ0FBQyxDQUFDO0FBa0JwQiIsImZpbGUiOiJjb21wb25lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHRhbmd1bGFyLm1vZHVsZSgnVGVzdGluZycsIFsndGVtcGxhdGVzJ10pO1xuXG5cdC8qKlxuICAqIFVzZWQgYnkgZ3VscC1hbmd1bGFyLXRlbXBsYXRlc1xuICAqIHRvIGlubGluZSB0aGUgdGVtcGxhdGVzIGluIHRoZSBwcm9kdWN0aW9uIGNvZGVcbiAgKi9cblx0YW5ndWxhci5tb2R1bGUoJ3RlbXBsYXRlcycsIFtdKTtcbn0pKCk7IiwiJ3VzZSBzdHJpY3QnO1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0YW5ndWxhci5tb2R1bGUoJ1Rlc3RpbmcnKS5kaXJlY3RpdmUoJ3Rlc3RpbmdEaXJlY3RpdmUnLCBUZXN0aW5nRGlyZWN0aXZlKTtcblxuXHRmdW5jdGlvbiBUZXN0aW5nRGlyZWN0aXZlKCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXN0cmljdDogJ0VBJyxcblx0XHRcdGxpbms6IGxpbmssXG5cdFx0XHRzY29wZToge1xuXHRcdFx0XHRldmVudDogJyZvbkV2ZW50Jyxcblx0XHRcdFx0ZGF0YTogJz0nXG5cdFx0XHR9LFxuXHRcdFx0dGVtcGxhdGVVcmw6ICdzcmMvdGVzdGluZy50ZW1wbGF0ZS5odG1sJ1xuXHRcdH07XG5cblx0XHRmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuXG5cdFx0XHRzY29wZS5pbnRlcm5hbFZhbHVlID0gdHJ1ZTtcblxuXHRcdFx0c2NvcGUuaW50ZXJuYWxEaXJlY3RpdmVNZXRob2QgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHNjb3BlLmludGVybmFsVmFsdWUgPSAhc2NvcGUuaW50ZXJuYWxWYWx1ZTtcblx0XHRcdH07XG5cdFx0fVxuXHR9XG59KSgpOyIsIid1c2Ugc3RyaWN0JztcblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdGFuZ3VsYXIubW9kdWxlKCdUZXN0aW5nJykuc2VydmljZSgnVGVzdGluZ1NlcnZpY2UnLCBUZXN0aW5nU2VydmljZSk7XG5cblx0ZnVuY3Rpb24gVGVzdGluZ1NlcnZpY2UoKSB7XG5cblx0XHR2YXIgcmVzcG9uc2UgPSB7XG5cdFx0XHQnZGF0YSc6IFt7XG5cdFx0XHRcdCdJRCc6IDEsXG5cdFx0XHRcdCd0aXRsZSc6ICdkdW1teSAxJ1xuXHRcdFx0fSwge1xuXHRcdFx0XHQnSUQnOiAyLFxuXHRcdFx0XHQndGl0bGUnOiAnZHVtbXkgMidcblx0XHRcdH0sIHtcblx0XHRcdFx0J0lEJzogMyxcblx0XHRcdFx0J3RpdGxlJzogJ2R1bW15IDMnXG5cdFx0XHR9XVxuXHRcdH07XG5cblx0XHR2YXIgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0aW5kZXg6IGluZGV4LFxuXHRcdFx0YnlJRDogYnlJRFxuXHRcdH07XG5cblx0XHRmdW5jdGlvbiBpbmRleCgpIHtcblx0XHRcdHJldHVybiBkYXRhO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGJ5SUQoSUQpIHtcblx0XHRcdHJldHVybiBkYXRhLmZpbHRlcihmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0XHRyZXR1cm4gaXRlbS5JRCA9PT0gSUQ7XG5cdFx0XHR9KVswXTtcblx0XHR9XG5cdH1cbn0pKCk7IiwiZXhwb3J0IGRlZmF1bHQgYW5ndWxhci5tb2R1bGUoXCJ0ZW1wbGF0ZXNcIikucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsIGZ1bmN0aW9uKCR0ZW1wbGF0ZUNhY2hlKSB7JHRlbXBsYXRlQ2FjaGUucHV0KFwic3JjL3Rlc3RpbmcudGVtcGxhdGUuaHRtbFwiLFwiPGJ1dHRvbiBuZy1jbGljaz1cXFwiZXZlbnQoe21lc3NhZ2U6IFxcJ2Zyb20gZGlyZWN0aXZlXFwnfSlcXFwiPlRyaWdnZXIgb3V0c2lkZSBtZXRob2QgKGNvbnRyb2xsZXIpPC9idXR0b24+XFxuPHA+XFxuICAgIERhdGEgZnJvbSB0aGUgb3V0c2lkZToge3tkYXRhfX1cXG48L3A+XFxuPHA+XFxuICAgIEludGVybmFsIGRpcmVjdGl2ZSBkYXRhOiB7e2ludGVybmFsVmFsdWV9fVxcbiAgICA8YnV0dG9uIG5nLWNsaWNrPVxcXCJpbnRlcm5hbERpcmVjdGl2ZU1ldGhvZCgpXFxcIj5UcmlnZ2VyIGludGVybmFsIG1ldGhvZDwvYnV0dG9uPlxcbjwvcD5cIik7fV0pOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF90ZXN0aW5nTW9kdWxlID0gcmVxdWlyZSgnLi90ZXN0aW5nLm1vZHVsZS5qcycpO1xuXG52YXIgX3Rlc3RpbmdNb2R1bGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGVzdGluZ01vZHVsZSk7XG5cbnZhciBfdGVzdGluZ0RpcmVjdGl2ZSA9IHJlcXVpcmUoJy4vdGVzdGluZy5kaXJlY3RpdmUuanMnKTtcblxudmFyIF90ZXN0aW5nRGlyZWN0aXZlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3Rlc3RpbmdEaXJlY3RpdmUpO1xuXG52YXIgX3Rlc3RpbmdTZXJ2aWNlID0gcmVxdWlyZSgnLi90ZXN0aW5nLnNlcnZpY2UuanMnKTtcblxudmFyIF90ZXN0aW5nU2VydmljZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90ZXN0aW5nU2VydmljZSk7XG5cbnZhciBfdGVtcGxhdGVzID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMuanMnKTtcblxudmFyIF90ZW1wbGF0ZXMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdGVtcGxhdGVzKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH0iXX0=