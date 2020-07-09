angular
.module('common')
.config (function ($locationProvider, ParseProvider) {
  // Parse instantiation and initialization with our back4app keys
  var MY_PARSE_APP_ID = 'gGgrJFog58OMOn0sFTg4r0dJpcvzZUZa9lYHLCuy'; 
  var MY_PARSE_JS_KEY = 'vDQ8tG0uacwjMn3MyFItsTWusMztZNDVDbaobf7U';
  ParseProvider.initialize(MY_PARSE_APP_ID, MY_PARSE_JS_KEY); // Initialize
  ParseProvider.serverURL = 'https://parseapi.back4app.com/';
})
