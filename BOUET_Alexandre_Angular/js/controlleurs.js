(function () {

        // rootScope (Permet d'acceder aux fonctions de n'importe quel controlleur)
    
       bieroAdmin.run(function($rootScope, $mdToast, $http, $location) {
                    
        /*  Fonction afficheToaster qui affiche le toaster
        *   @param : message (string)
        */
           
        $rootScope.afficheToaster =  function(message) {
            $mdToast.show(
              $mdToast.simple()
                .textContent(message)
                .parent(".afficheToast")
                .position("bottom-right")
                .hideDelay(3000)
       
            );
          };
        
        /*  Fonction effacerBiere qui supprime une bière
        *   @param : id_biere (int)
        */
           
        $rootScope.effacerBiere = function(id_biere){
            console.log("j'efface la biere " + id_biere);
            var auth = btoa("biero:biero");
            var req = {
                method : 'DELETE', 
                url : 'http://127.0.0.1:8000/webservice/php/biere/'+id_biere,
                headers : {"Authorization" : "Basic " + auth}
            };
            $http(req).then(function(reponse){
                console.log(reponse);
                
                $location.url("/?msg=delSucces");
    
            });
        };
           

    });
    
    // Controller de la liste des bières

    bieroAdmin.controller('BieroListeCtrl', ['$scope', '$http','$mdToast','$mdDialog','$routeParams', function($scope, $http, $mdToast, $mdDialog, $routeParams){
        console.log('je suis BieroListeCtrl');
        //$scope.biere ={"nom" : "Une bière"};
        var req = {
            method : 'GET', 
            url : 'http://127.0.0.1:8000/webservice/php/biere',  
        };
        $http(req).then(function(reponse){
            //console.log(reponse);
            $scope.bieres = reponse.data;
            var message ="";
                        
            // Image de bière par defaut
            
            for(var i = 0; i < $scope.bieres.length; i++) 
                {
                     
                    if(!$scope.bieres[i].image) 
                    {   
                        $scope.bieres[i].image = "./images/default.jpg"
                    }
                }
            
            // Message des toasters en fonction
            // de la route après opération
            
            if ($routeParams.msg == "delSucces") 
            {
                message = "Bière Supprimée";
                $scope.afficheToaster(message);
            }           
            
            
            if ($routeParams.msg == "ModSucces") 
            {
                message = "Bière Modifiée";
                $scope.afficheToaster(message);
            }           
            
            if ($routeParams.msg == "addSucces") 
            {
                message = "Bière Ajoutée";
                $scope.afficheToaster(message);
            }

        });
        
        /*  Fonction dialogueConfirme qui affiche une fenêtre
        *   de confirmation
        */     
        
        $scope.dialogueConfirme = function(ev) {
            var id_biere = this.biere.id_biere;

            var message;
            var confirm = $mdDialog.confirm()
                  .title('Supprimer')
                  .textContent('Êtes vous sur de vouloir supprimer la bière')
                  .ariaLabel('')
                  .targetEvent(ev)
                  .ok('Supprimer')
                  .cancel('Annuler');
            $mdDialog.show(confirm).then(function() {
                $scope.effacerBiere(id_biere)
                $scope.afficheToaster(message);
            }, function() {
                message = "Suppression annulée"
                $scope.afficheToaster(message);
            });
          };
        
          
    }]);
    
//    Controller de modification des informations d'une bière
    
    bieroAdmin.controller('BieroDetailsCtrl', ['$scope', '$http', '$routeParams', '$location','$mdToast','$mdDialog', function($scope, $http, $routeParams, $location, $mdToast, $mdDialog){
        console.log('je suis BieroDetailsCtrl');
        $scope.id_biere = $routeParams.id_biere;
        var req = {
            method : 'GET', 
            url : 'http://127.0.0.1:8000/webservice/php/biere/'+$scope.id_biere,  
        };
        $http(req).then(function(reponse){
            console.log(reponse);
            $scope.biere = reponse.data;
        });
        
        /*  Fonction modifierBiere modifie une biere
        */     
        
        $scope.modifierBiere = function()
        {
            var auth = btoa("biero:biero");
            var req = {
                method : 'POST', 
                url : 'http://127.0.0.1:8000/webservice/php/biere/'+$scope.id_biere,
                data : JSON.stringify($scope.biere),
                headers : {"Authorization" : "Basic " + auth}
            };
            $http(req).then(function(reponse){
                 console.log(reponse);
                 $location.url("/?msg=ModSucces");
                
            });
        }
        
        
        /*  Fonction dialogueConfirme qui affiche une fenêtre
        *   de confirmation
        */     
        
                           
        $scope.dialogueConfirme = function(ev) {
            //console.log(biere_id);
            var message;
            var confirm = $mdDialog.confirm()
                  .title('Supprimer')
                  .textContent('Êtes vous sur de vouloir supprimer la bière')
                  .ariaLabel('')
                  .targetEvent(ev)
                  .ok('Supprimer')
                  .cancel('Annuler');
            $mdDialog.show(confirm).then(function() {
                $scope.effacerBiere($scope.id_biere)
                $scope.afficheToaster(message);
            }, function() {
                message = "Suppression annulée"
                $scope.afficheToaster(message);
            });
          };


        
    }]);    
    
    // Controlleur d'ajout de bière
    
    bieroAdmin.controller('BieroAjoutCtrl', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location){
        console.log('je suis BieroDetailsCtrl');

        /*  Fonction ajoutBiere qui ajoute une bière
        */
        
        $scope.ajoutBiere = function()
        {
            var auth = btoa("biero:biero");
            var req = {
                method : 'PUT', 
                url : 'http://127.0.0.1:8000/webservice/php/biere/ajouter',
                data : JSON.stringify($scope.biere),
                headers : {"Authorization" : "Basic " + auth}
            };
            $http(req).then(function(reponse){
                console.log(reponse);

                $location.url("/?msg=addSucces");
                                
                var message = "Ajout effectué !"
                $scope.afficheToaster(message);
                
            });
        }        
    }]);
    
})();



