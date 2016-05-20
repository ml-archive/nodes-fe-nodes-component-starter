namespace component {
    'use strict';

    export interface IComponentService {
    	index: () => Array<any>;
    	byID: (ID: string) => Object;
    }

    class ComponentService implements IComponentService {

        static $inject: Array<string> = [];
        constructor(){}

        private data: Array<any> = [
            {
                'ID': 1,
                'title': 'dummy 1'
            },
            {
                'ID': 2,
                'title': 'dummy 2'
            },
            {
                'ID': 3,
                'title': 'dummy 3'
            }
        ];

        index() {
            return this.data;
        }

        byID(ID: string) {
            return this.data.filter(function(item) {
                return item.ID === ID;
            })[0];
        }
    }

    angular
        .module('component')
        .service('ComponentService', ComponentService);
}

