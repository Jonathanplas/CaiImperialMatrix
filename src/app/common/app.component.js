// Declare bindings and such
var app = {
templateUrl: './app.html',
controller: 'AppController'
};

// Register component and set appropriate urls
angular
.module('common')
.component('app', app)
.config(function ($stateProvider) {
  $stateProvider
    .state('app', {
      url: '/',
      data: {
        //requiredAuth: true // Additional line to make authentication required
      },
      component: 'app'

    })
});
