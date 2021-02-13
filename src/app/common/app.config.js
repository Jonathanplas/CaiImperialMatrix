angular
.module('common')
.config (function ($locationProvider, ParseProvider) {
  // Parse instantiation and initialization with our back4app keys
  var MY_PARSE_APP_ID = 'q4BtJrv5tPWOkH5QFeWrQQ9vGR6KiTCSg0tyw3Lg';
  var MY_PARSE_JS_KEY = 'VEVK7CIIA9xsDiIT95fWiOY5tx7qxuRiCZLu8lDk';
  ParseProvider.initialize(MY_PARSE_APP_ID, MY_PARSE_JS_KEY); // Initialize
  ParseProvider.serverURL = 'https://parseapi.back4app.com/';
})
