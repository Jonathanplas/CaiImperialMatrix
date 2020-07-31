function PhenotypeController($state, $mdSidenav, PersonModel) {
    var ctrl = this;
    ctrl.sideBarContent = null;
    ctrl.image = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Hesburgh_Joyce_Statue.jpg/800px-Hesburgh_Joyce_Statue.jpg"; // Place holder image, replaced by link from database
    ctrl.person = null
    // NOTE: types gotten via a resolve binding found in the component file
    ctrl.$onInit = function() {
       console.log(ctrl.types);
    }

    // Main open function
  ctrl.isOpenRight = function() {
    return $mdSidenav('right').isOpen();
  }


  function buildToggler(navID) {
    $mdSidenav(navID)
      .toggle()
      .then(function () {
        console.log("Toggle " + navID + " is done");
      });

  }

  function storePersonData(response) {
    ctrl.person = response[0]; // Grab first response, as Id's are unique
    ctrl.image = ctrl.person.image_link;
    console.log(ctrl.person)
  }


  ctrl.toggleRight = function(pheno){
    ctrl.sideBarContent = pheno;
    var id = pheno.id; // Get id of phenotype object and use that to search the database for the person
    PersonModel.getById(id).then(storePersonData);
    console.log(ctrl.person)
    console.log(ctrl.sideBarContent);

    buildToggler('right');

  }
}
// Controller to close side bar
function RightCtrl($timeout, $mdSidenav) {
    var ctrl = this

    ctrl.close = function() {
      $mdSidenav('right').close()
        .then(function () {
          console.log('close RIGHT is done');
        });
    };
  }

// Add controller to appropriate module
angular
  .module('phenoTable')
  .controller('PhenotypeController', PhenotypeController);

angular
  .module('phenoTable')
  .controller('RightCtrl', RightCtrl);
