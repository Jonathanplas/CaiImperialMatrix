// Pass all routed component dependancies
angular
    .module('components', [
        'home',
        'therapies',
        'physicians',
        'phenoTable',
        'auth'
    ]);