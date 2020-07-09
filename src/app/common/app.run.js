function init($rootScope, $uiRouter){
  // UI router instantiation
  var Visualizer = window['ui-router-visualizer'].Visualizer;
  var pluginInstance = $uiRouter.plugin(Visualizer);

  $rootScope.isEmpty = isEmpty;

  function isEmpty(obj) {

    for (var key in obj) {

      if(obj.hasOwnProperty(key)){
        return false;
      }
      else {
          return true;
      }
    }
  }
}
// Run the function
angular
  .module('common')
  .run(init)
