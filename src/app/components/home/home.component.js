// Component for the main homepage

var home = {
    templateUrl: './home.html'
};

angular
    .module('home')
    .component('home',home)
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', { 
                redirectTo:'home.phenoTable', // Should redirect to the phenoTable view first
                url: '/home',
                component: 'home',
                parent: 'app',
            
            });
        $urlRouterProvider.otherwise('/')
            
    });