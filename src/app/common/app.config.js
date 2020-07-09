angular

.module('common')
.config (function ($locationProvider, ParseProvider) {

  var MY_PARSE_APP_ID = 'gGgrJFog58OMOn0sFTg4r0dJpcvzZUZa9lYHLCuy'; //Wicks
  var MY_PARSE_JS_KEY = 'vDQ8tG0uacwjMn3MyFItsTWusMztZNDVDbaobf7U';
  ParseProvider.initialize(MY_PARSE_APP_ID, MY_PARSE_JS_KEY);
  ParseProvider.serverURL = 'https://parseapi.back4app.com/';
})
