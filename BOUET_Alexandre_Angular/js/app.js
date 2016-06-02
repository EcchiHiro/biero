var bieroAdmin = (function () {
    var bieroAdmin = angular.module('BieroAdmin', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngMdIcons']);
    
    bieroAdmin.config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/', 
                    {
                        templateUrl : 'partiels/biere-liste.html', 
                        controller : 'BieroListeCtrl'
        }).when('/ajouter', 
                    {
                        templateUrl : 'partiels/biere-ajouter.html', 
                        controller : 'BieroAjoutCtrl'
        }).when('/:id_biere', 
                    {
                        templateUrl : 'partiels/biere-details.html', 
                        controller : 'BieroDetailsCtrl'
        }).otherwise({redirectTo: '/'});
}]);
    
    return bieroAdmin;
})();

