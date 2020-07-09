var therapies = {
    templateUrl: './therapies.html'
};

angular
    .module('therapies')
    .component('therapies', therapies)
    .config(function ($stateProvider) {
        $stateProvider
            .state('therapies', {
                url: '/therapies',
                component: 'therapies',
                parent: 'app'
            })
 
    });