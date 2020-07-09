// Declaration of stateless phenoEntry component

var phenoEntry = {
    templateUrl: './phenoEntry.html',
    controller: 'PhenoEntryController',
    bindings: {
      pheno: '<', // One way binding for the input of the phenotype field
      onRemove: '&' // Output binding for onRemove getting sent up the component tree
    }
    };
    
    // Register the component to the phenoTable parent module
    angular
    .module('phenoTable')
    .component('phenoEntry', phenoEntry);

