angular.module('myApp', []).controller('relationships', function($scope) {
  $scope.names = [
    {name:'Jani',country:'Norway'},
    {name:'Hege',country:'Sweden'},
    {name:'Kai',country:'Denmark'}
  ];
});
// angular
//   .module('relationships')
//   .controller('RelationshipsController', RelationshipsController);
