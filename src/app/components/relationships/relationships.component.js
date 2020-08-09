// Register routed and stateful relationships component

var relationships = {
    templateUrl: './relationships.html'
};

angular
    .module('relationships')
    .component('relationships', relationships)
    .config(function ($stateProvider) {
        $stateProvider
            .state('relationships', {
                url: '/relationships',
                component: 'relationships',
                parent: 'app'
            })

    });
