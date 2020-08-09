function PhenoEntryController() {
  var ctrl = this;

  ctrl.toggle = function() {
      ctrl.toggleSide({pheno: ctrl.pheno});
  }

}

// register controller to parent module
angular
  .module('phenoTable')
  .controller('PhenoEntryController', PhenoEntryController);
