 // Service used to manage authentication
 function AuthService(Parse) {
   
    var auth = new Parse.User(); // Used as placeholder to set fields for log in and registering
    var authData = null;        // Variable used to store user data once logged in

    function storeAuthData (response) {
        authData = response;
        console.log(authData);
        return authData;
    }

    function clearAuthData() {
        authData = null;
    }

    // Check if the user contains valid sign in data
    function onSignIn (user) {
       if (!!authData) {
        return authData.authenticated();
       }
       else {
           return false
       }
    }

    // Login and store user data
    this.login = function(user) {
        console.log('Login attempt...');
        console.log(user.email);
        console.log(user.password);
        auth.set("username", user.email);
        auth.set("password", user.password);
        return auth
        .logIn()
        .then(storeAuthData);
    }

    this.requireAuthentication = function() {
       var user = this.getUser();
        return Promise.resolve(user).then(onSignIn) // Return promise resolved in onSignIn, caught and redirected in auth module
            
       
    }

    this.isAuthenticated = function() {
        return !!authData;
    }
    // Register a new user and store user daya
    this.register = function(user) {
        console.log('Registration attempt...');
        auth.set("username", user.email);
        auth.set("password", user.password);
        auth.set("email", user.email);
        return auth
         .signUp()
         .then(storeAuthData);

    }

    this.getUser = function () {
        return authData;
    }

    // Logout user and clear the current authentication data
    this.logout = function() {
        return Parse.User.logOut().then(clearAuthData)
    }
}

angular
 .module('common')
 .service('AuthService', AuthService);