namespace component {

    export interface IComponentProvider extends ng.IServiceProvider {
        configure: any
    }

    export interface IComponentProviderConfig {
        debug: boolean
    }

    export class ComponentProvider {
        static $inject: Array<string> = [];
        constructor() {}

        private config: IComponentProviderConfig = {
            debug: true
        };

        configure(config: IComponentProviderConfig) {
            if(!arguments[0]) {
                return this.config;
            } else {
                angular.extend(this.config, config);
            }
        }

        $get: () => { config: IComponentProviderConfig } = () => { return { config: this.config }; }
    }

    angular
        .module('component')
        .provider('component', ComponentProvider);
}