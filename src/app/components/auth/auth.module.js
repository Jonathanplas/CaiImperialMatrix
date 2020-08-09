// Module registered in root to manage authentication
angular
  .module('auth', [
    'ui.router',
    'ngParse'
  ])
  .run(function ($transitions, $state, AuthService) {
    $transitions.onStart({
      to: function(state) {
        return !!(state.data && state.data.requiredAuth); // Check if authentication is required for that route (All routes in our website are protected)
      }
    }, function() {
        return AuthService
          .requireAuthentication()
          // Catch promise rejection for unauthenticated user and reoute to login page
          .catch(function () {
            return $state.target('login');
          })
    });
    $transitions.onStart({
      to: 'auth.*'
    }, function () {
      if (AuthService.isAuthenticated()) {
        return $state.target('app');
      }
    });
  });

