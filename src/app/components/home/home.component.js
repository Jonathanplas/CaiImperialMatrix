var home = {
    templateUrl: './home.html'
};

angular
    .module('home')
    .component('home',home)
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', { 
                redirectTo:'home.phenoTable',
                url: '/home',
                component: 'home',
                parent: 'app',
            
            });
        $urlRouterProvider.otherwise('/')
            
    });