var login = {
  templateUrl: './login.html',
  controller: 'LoginController'
};

angular
  .module('auth')
  .component('login', login)
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('auth', {
        redirectTo: 'login',
        url: '/auth',
        template: '<div ui-view></div>'
      })
      .state('login', {
        url: '/login',
        component: 'login',
        parent: 'auth'
      });
    $urlRouterProvider.otherwise('/auth/login');
  });
