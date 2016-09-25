namespace component {
    'use strict';

    interface IComponentDirectiveScope {
        event: any
        data: any
    }

    class ComponentDirective implements ng.IDirective {
        static $inject: Array<string> = [];
        constructor() {}

        static instance(): ng.IDirective {
            return new ComponentDirective();
        }

        bindToController: boolean = true;
        link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void = this.linkFn;
        controller: ComponentDirectiveController = ComponentDirectiveController;
        restrict: string = 'EA';
        templateUrl: string = 'src/unique-component-template-name.html';
        controllerAs: string = 'ComponentDirective';
        scope: IComponentDirectiveScope = {
            event: '&onEvent',
            data: '='
        };

        private linkFn(scope: any, element: any, attrs: any) {
            scope.internalValue = true;

            scope.internalDirectiveMethod = () => {
                scope.internalValue = !scope.internalValue;
            }
        }
    }

    class ComponentDirectiveController {
        static $inject: Array<string> = ['ComponentService'];
        constructor(private ComponentService: any) {
            console.log( 'Injected service:', this.ComponentService.index() );
        }
    }

    angular
        .module('component')
        .directive('componentDirective', ComponentDirective.instance);
}