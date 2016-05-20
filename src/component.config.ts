namespace component {

    function config(componentProvider: IComponentProvider) {
        componentProvider.configure({test: 'blabla'});
    }

    angular
        .module('component')
        .config(config);
}