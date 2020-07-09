var therapies = {
    templateUrl: './physicians.html'
};

angular
    .module('physicians')
    .component('physicians', therapies)
    .config(function ($stateProvider) {
        $stateProvider
            .state('physicians', {
                url: '/physicians',
                component: 'physicians',
                parent: 'app'
            })
 
    });