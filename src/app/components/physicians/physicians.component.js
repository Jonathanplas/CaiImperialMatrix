// Register routed and stateful physicians component
var physicians = {
    templateUrl: './physicians.html',
    controller: 'PhysiciansController'
};

angular
    .module('physicians')
    .component('physicians', physicians)
    .config(function ($stateProvider) {
        $stateProvider
            .state('physicians', {
                url: '/physicians',
                component: 'physicians',
                parent: 'app'
            })

    });
