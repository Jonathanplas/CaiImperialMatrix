function PhenoEntryController() {
  var ctrl = this;
  //Remove function which sends the item up to the table component
  ctrl.remove = function() {
      ctrl.onRemove({pheno: ctrl.pheno});
  }
}

// register controller to parent module
angular
  .module('phenoTable')
  .controller('PhenoEntryController', PhenoEntryController);