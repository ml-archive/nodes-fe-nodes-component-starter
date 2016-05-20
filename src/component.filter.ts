namespace component {
    'use strict';

    export class ComponentFilter {
        static $inject: Array<string> = [];

        constructor() {}

        static instance() {
            return new ComponentFilter().filterFn;
        }

        private filterFn(input:string): string {
            return input ? input + '\u2713' : '\u2718';
        }
    }

    angular
        .module('component')
        .filter('componentFilter', ComponentFilter.instance);
}