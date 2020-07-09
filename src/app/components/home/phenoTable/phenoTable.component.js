var phenoTable = {
    bindings: {
      types: '<'
    },
    templateUrl: './phenoTable.html',
    controller: 'PhenotypeController'
   
    };
    
    angular
    .module('phenoTable')
    .component('phenoTable', phenoTable)
    .config(function ($stateProvider) {
      $stateProvider
        .state('phenoTable', {
          url: '/',
          component: 'phenoTable',
          parent: 'home',
          resolve: {
            types: function(PhenotypeModel) {
              console.log("Loading imperial data...");
              return PhenotypeModel.getAllPhenotypes()
            }
          }
        })
    });
