namespace component {
    'use strict';

    interface IComponentDirectiveScope {
        event: any
        data: any
    }

    class ComponentDirective {
        static $inject: Array<string> = ['ComponentService'];
        constructor() {}

        static instance(): ng.IDirective {
            return new ComponentDirective();
        }

        bindToController: boolean = false;
        link: (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes) => void = this.linkFn;
        controller: (ComponentService: any) => void = this.controllerFn;
        restrict: string = 'EA';
        templateUrl: string = 'src/component.html';
        scope: IComponentDirectiveScope = {
            event: '&onEvent',
            data: '='
        };

        private controllerFn(ComponentService: IComponentService) {
            console.log( 'Injected service:', ComponentService.index() );
        }

        private linkFn(scope: any, element: any, attrs: any) {
            scope.internalValue = true;

            scope.internalDirectiveMethod = () => {
                scope.internalValue = !scope.internalValue;
            }
        }
    }

    angular
        .module('component')
        .directive('componentDirective', ComponentDirective.instance);
}