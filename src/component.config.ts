namespace component {

    config.$inject = ['componentProvider'];

    function config(componentProvider: IComponentProvider) {
        componentProvider.configure({test: 'Testing Configure Function'});
    }

    angular
        .module('component')
        .config(config);
}