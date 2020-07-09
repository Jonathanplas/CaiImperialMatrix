function PhenotypeController($state) {
    var ctrl = this;
    // NOTE: types is gotten via a resolve binding found in the component file
    ctrl.$onInit = function() {
       console.log(ctrl.types);
    }

    // Remove locally to clean up the view
    ctrl.removePhenotype = function(pheno) {
        var ind = ctrl.types.indexOf(pheno); // Get index of item
        ctrl.types.splice(ind, 1); // Remove from list
    }

}

// Add controller to appropriate module
angular
  .module('phenoTable')
  .controller('PhenotypeController', PhenotypeController);