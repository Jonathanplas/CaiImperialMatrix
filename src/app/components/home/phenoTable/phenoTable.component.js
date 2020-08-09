var phenoTable = {
    // bind the data from the resolve
    bindings: {
      types: '<'
    },
    templateUrl: './phenoTable.html',
    controller: 'PhenotypeController'   
};

// Register component (routed and stateful)
angular
  .module('phenoTable')
    .component('phenoTable', phenoTable)
    .config(function ($stateProvider) {
      $stateProvider
        .state('phenoTable', {
          url: '/phenotable',
          component: 'phenoTable',
          parent: 'home', // Paren to the home view
          // Retrieve data from the PhenotypeModel service in the database
          resolve: {
            types: function(PhenotypeModel) {
              console.log("Loading imperial data...");
              return PhenotypeModel.getAllPhenotypes()
            }
          }
        })
    });
