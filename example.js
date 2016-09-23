(function() {
	
	angular.module('demoApp', [
		'nDocs',
		'nImage'
	]);
	
	angular
		.module('demoApp')
		.controller('demoController', function() {
			var vm = this;
			vm.testValue = 'Greetings from Angular with custom filter!';
			vm.controllerMethod = function(message) {
				console.log(message);
			};
		});
	
})();
/* ng-ScrollSpy.js v3.2.2
 * https://github.com/patrickmarabeas/ng-ScrollSpy.js
 *
 * Copyright 2014, Patrick Marabeas http://marabeas.io
 * Released under the MIT license
 * http://opensource.org/licenses/mit-license.php
 *
 * Date: 09/02/2016
 */

;(function(window, document, angular, undefined) {
	'use strict';
	angular.module('ngScrollSpy', [])
		
		.value('scrollSpyDefaultConfig', {
			'offset': 200,
			'delay': 100
		})
		
		.run(['PositionFactory', function(PositionFactory) {
			PositionFactory.refreshPositions();
			angular.element(window).bind('scroll', function() {
				PositionFactory.refreshPositions();
			});
		}])
		
		.factory('PositionFactory', ['$rootScope', function($rootScope){
			return {
				'position': [],
				'refreshPositions': function() {
					this.position.documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)
					this.position.windowTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
					this.position.windowBottom = this.position.windowTop + window.innerHeight
				}
			}
		}])
		
		.factory('SpyFactory', ['$rootScope', function($rootScope){
			return {
				'spies': [],
				'addSpy': function(id) {
					var index = this.spies.map(function(e) { return e }).indexOf(id);
					if(index == -1) {
						this.spies.push(id);
						this.broadcast();
					}
				},
				'removeSpy': function(id) {
					var index = this.spies.map(function(e) { return e }).indexOf(id);
					if(index != -1) {
						this.spies.splice(index, 1);
						this.broadcast();
					}
				},
				'broadcast': function() {
					$rootScope.$broadcast('spied');
				}
			}
		}])
		
		.directive('scrollspyBroadcast', [
			'scrollSpyDefaultConfig',
			'scrollspyConfig',
			'SpyFactory',
			'PositionFactory',
			
			function(config, scrollspyConfig, SpyFactory, PositionFactory) {
				return {
					restrict: 'A',
					scope: true,
					link: function(scope, element, attrs) {
						angular.extend(config, scrollspyConfig.config);
						var offset = parseInt(attrs.scrollspyOffset || config.offset);
						scope.checkActive = function() {
							scope.elementTop = element[0].offsetTop;
							scope.elementBottom = scope.elementTop + Math.max(element[0].scrollHeight, element[0].offsetHeight);
							
							if((scope.elementTop - offset) < (PositionFactory.position.documentHeight - window.innerHeight)) {
								if(scope.elementTop <= (PositionFactory.position.windowTop + offset)) {
									SpyFactory.addSpy(attrs.id);
								} else {
									SpyFactory.removeSpy(attrs.id);
								}
								
							} else {
								if(PositionFactory.position.windowBottom > (scope.elementBottom - offset)) {
									SpyFactory.addSpy(attrs.id);
								} else {
									SpyFactory.removeSpy(attrs.id);
								}
							}
						};
						
						config.throttle
							? angular.element(window).bind('scroll', config.throttle(function() { scope.checkActive() }, config.delay))
							: angular.element(window).bind('scroll', function() { scope.checkActive() });
						
						angular.element(document).ready( function() { scope.checkActive() });
						angular.element(window).bind('resize', function () { scope.checkActive() });
					}
				}
			}
		])
		
		.directive('scrollspyListen', ['$timeout', 'SpyFactory', function($timeout, SpyFactory) {
			return {
				restrict: 'A',
				scope: {
					scrollspyListen: '@',
					enabled: '@'
				},
				replace: true,
				transclude: true,
				template: function(element) {
					var tag = element[0].nodeName;
					return '<' + tag + ' data-ng-transclude data-ng-class="{active: enabled}"></' + tag + '>';
				},
				link: function(scope) {
					scope.$on('spied', function() {
						$timeout(function() {
							var spies = scope.scrollspyListen.split("|");
							for(var i = 0; i < spies.length; i++)
								if(scope.enabled = spies[i] === SpyFactory.spies[SpyFactory.spies.length - 1])
									break;
						});
					});
				}
			}
		}])
		
		.provider('scrollspyConfig', function() {
			var self = this;
			this.config = {};
			this.$get = function() {
				var extend = {};
				extend.config = self.config;
				return extend;
			};
			return this;
		});
	
})(window, document, angular);
(function() {
	'use strict';
	
	angular.module('nDocs', [
		'headroom',
		'hljs',
		'ui.scrollpoint',
		'ngScrollSpy'
	]);
	window.addEventListener('load', function() {
		hljs.initLineNumbersOnLoad();
	});
	
	angular.module('nDocs')
		.constant('GITHUB', {
			URL: 'https://api.github.com/repos',
			CLIENT_ID: '2304011fdc02ec86a757',
			CLIENT_SECRET: '8027a247cca6901e6c3d9b68b99af73fabbfad3e',
			NAME: 'nodes-frontend',
			REPOSITORY: 'nodes-component-starter'
		});
	angular.module('nDocs')
		.constant('NPM', {
			URL: 'https://www.npmjs.com/package',
			NAME: 'nodes-component-starter'
		});
	angular.module('nDocs')
		.constant('COMPONENT', {
			MODULE_NAME: 'component'
		});
	
	angular.module('nDocs')
		.directive('nDocsGranim', function() {
			return {
				restrict: 'AE',
				link: linkFn
			};
			
			function linkFn(scope, element, attrs) {
				
				var gradientColors = scope.$eval(attrs.colors);
				
				var gradientInstance = new Granim({
					element: element[0],
					isPausedWhenNotInView: true,
					opacity: [1, 1],
					states: {
						'default-state': {
							gradients: gradientColors
						}
					}
				});
				
				scope.$on('$destroy', function() {
					gradientInstance.clear();
				});
				
			}
		});
	
	angular.module('nDocs')
		.directive('nDocsCodeExample', function() {
			return {
				transclude: true,
				template: [
					'<div class="n-docs-code-example">',
					'<ng-transclude></ng-transclude>',
					'</div>'
				].join('')
			};
		});
	
	angular.module('nDocs')
		.component('nDocsGithubIcon', {
			template: [
				'<svg class="n-docs-icon n-docs-icon--github" viewBox="0 0 128 128" height="18" width="18">',
				'<path fill-rule="evenodd" clip-rule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"></path><path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm-.743-.55M28.93 94.535c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zm-.575-.618M31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm0 0M34.573 101.373c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm0 0M39.073 103.324c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm0 0M44.016 103.685c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm0 0M48.614 102.903c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path>',
				'</svg>'
			].join('')
		});
	angular.module('nDocs')
		.component('nDocsStarIcon', {
			template: [
				'<svg class="n-docs-icon n-docs-icon--github" height="18" viewBox="0 0 18 18" width="18" xmlns="http://www.w3.org/2000/svg">',
				'<path d="M9 11.3l3.71 2.7-1.42-4.36L15 7h-4.55L9 2.5 7.55 7H3l3.71 2.64L5.29 14z"/>',
				'</svg>'
			].join('')
		});
	
	angular.module('nDocs')
		.component('nDocsGithubLink', {
			controller: nDocsGithubController,
			template: '<div ng-class="{\'n-docs-github-link--loading\': $ctrl.isLoading}" class="n-docs-github-link"><a href="{{$ctrl.repoUrl}}" target="_blank"><n-docs-github-icon></n-docs-github-icon></a></div>'
		});
	angular.module('nDocs')
		.component('nDocsGithubStars', {
			controller: nDocsGithubController,
			template: '<div ng-class="{\'n-docs-github-stars--loading\': $ctrl.isLoading}" class="n-docs-github-stars"><n-docs-star-icon></n-docs-star-icon> <span>{{::$ctrl.repoStars}}</span></a></div>'
		});
	angular.module('nDocs')
		.component('nDocsGithubLatestRelease', {
			controller: nDocsGithubController,
			template: '<div ng-class="{\'n-docs-github-latest-release--loading\': $ctrl.isLoading}" class="n-docs-github-latest-release"><a href="{{$ctrl.releaseUrl}}" target="_blank">Latest release:  {{::$ctrl.releaseName}}</a></div>'
		});
	angular.module('nDocs')
		.service('nDocsGithubService', function($q, $http, $window, GITHUB) {
			return {
				getStatistics: getStatistics
			};
			
			function getStatistics() {
				
				var deferred = $q.defer();
				
				var repoUrl = [
					GITHUB.URL,
					GITHUB.NAME,
					GITHUB.REPOSITORY
				].join('/');
				
				var repoRequest = {
					method: 'GET',
					url: repoUrl,
					cache: true,
					params: {
						client_id: GITHUB.CLIENT_ID,
						client_secret: GITHUB.CLIENT_SECRET
					}
				};
				
				var releasesUrl = [
					GITHUB.URL,
					GITHUB.NAME,
					GITHUB.REPOSITORY,
					'releases',
					'latest'
				].join('/');
				
				var releasesRequest = {
					method: 'GET',
					url: releasesUrl,
					cache: true,
					params: {
						client_id: GITHUB.CLIENT_ID,
						client_secret: GITHUB.CLIENT_SECRET
					}
				};
				
				if(!$window.localStorage.getItem(GITHUB.NAME + '-' + GITHUB.REPOSITORY)) {
					_getFromGithub().then(function(data) {
						deferred.resolve(data);
					});
				} else {
					var localStorageData = JSON.parse($window.localStorage.getItem(GITHUB.NAME + '-' + GITHUB.REPOSITORY));
					var lastTime = localStorageData.timeStamp;
					
					// Cache response for 10sec to avoid hitting the quota limits
					if(new Date().valueOf() - lastTime < 10000) {
						deferred.resolve(localStorageData);
					} else {
						_getFromGithub().then(function(data) {
							deferred.resolve(data);
						});
					}
					
				}
				
				return deferred.promise;
				
				function _getFromGithub() {
					return $q.all([$http(repoRequest), $http(releasesRequest)])
						.then(function(responses) {
							var repo = responses[0].data;
							var releases = responses[1].data;
							
							var toStorage = {
								timeStamp: new Date().valueOf(),
								repoStars: repo.stargazers_count,
								repoName: repo.name,
								repoUrl: repo.html_url,
								releaseName: releases.name,
								releaseUrl: releases.html_url
							};
							
							$window.localStorage.setItem(GITHUB.NAME + '-' + GITHUB.REPOSITORY, JSON.stringify(toStorage));
							
							return toStorage;
							
						})
						.catch(function(response) {
							deferred.reject(response);
						});
				}
				
			}
		});
	function nDocsGithubController($scope, $element, $attrs, nDocsGithubService) {
		var vm = this;
		
		vm.$onInit = onInit;
		
		vm.isLoading = true;
		
		function onInit() {
			nDocsGithubService.getStatistics()
				.then(function(response) {
					angular.extend(vm, response);
				})
				.finally(function() {
					vm.isLoading = false;
				})
		}
	}
	
	angular.module('nDocs')
		.component('nDocsNpmInstallGuide', {
			template: [
				'<div class="n-docs-npm-install-guide">',
				'<span>$ npm install --save {{::$ctrl.npmPackageName}}</span>',
				'</div>'
			].join(''),
			controller: function(NPM) {
				var vm = this;
				vm.npmPackageLink = [NPM.URL, NPM.name].join('/');
				vm.npmPackageName = NPM.NAME;
			}
		});
	
	angular.module('nDocs')
		.component('nDocsAngularInstallGuide', {
			template: '<div class="n-docs-angular-install-guide"><hljs hljs-interpolate="true">angular.module(\'myApp\', [\n\u0020\u0020\u0020\u0020\'{{::$ctrl.componentModuleName}}\'\n]);</hljs></div>',
			controller: function(COMPONENT) {
				var vm = this;
				vm.componentModuleName = COMPONENT.MODULE_NAME;
			}
		});
	
	angular.module('nDocs')
		.component('nDocsCallout', {
			transclude: true,
			bindings: {
				'severity': '<'
			},
			template: '<div class="n-docs-callout n-docs-callout--{{::$ctrl.type}}"><ng-transclude></ng-transclude></div>',
			controller: function() {
				var vm = this;
				
				switch(vm.severity) {
					case 0:
						vm.type = 'info';
						break;
					case 1:
						vm.type = 'warning';
						break;
					case 2:
						vm.type = 'alert';
						break;
					default:
						vm.type = 'info';
						break;
				}
			}
		});
	
	angular.module('nDocs')
		.component('nDocsNodesWebsiteLink', {
			template: '<a href="https://www.nodesagency.com/" target="_blank">Nodes Agency</a>'
		});
	angular.module('nDocs')
		.component('nDocsNodesEngeeringBlogLink', {
			template: '<a href="https://engineering.nodesagency.com/" target="_blank">Nodes Engineering</a>'
		});
	
	angular.module('nDocs')
		.directive('nDocsToc', function() {
			return {
				restrict: 'EA',
				template: [
					'<ul class="n-docs-toc" ui-scrollpoint>',
					'<li class="n-docs-toc__item" ng-repeat="link in nDocsToc.links">',
					'<a class="n-docs-toc__link" data-scrollspy-listen="{{::link.idRef}}" href="{{::link.href}}">{{::link.title}}</a>',
					'</li>',
					'</ul>'
				].join(''),
				controller: ctrlFn,
				controllerAs: 'nDocsToc',
				link: function(scope, element, attrs, ctrl) {
					ctrl.buildToc(document.querySelector(attrs.scan));
				}
			};
			
			function ctrlFn($scope) {
				var vm = this;
				
				vm.links = [];
				
				vm.buildToc = function(rootEl) {
					rootEl.querySelectorAll('.row').forEach(function(e) {
						if(e.getAttribute('id')) {
							vm.links.push({
								href: '#' + e.getAttribute('id'),
								title: e.getAttribute('title'),
								idRef: e.getAttribute('id')
							});
						}
					});
				};
			}
		});
	
})();