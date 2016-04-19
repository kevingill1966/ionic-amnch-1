'use strict';

(function() {
    
angular.module('amnch-handover')

    .controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
        $scope.data = {};
    
        $scope.login = function() {
            
            if (!$scope.data.username || !$scope.data.password) {
                   var alertPopup = $ionicPopup.alert({
                    title: 'Missing Credentials!',
                    template: 'Please check your credentials!'
                });
                return;
            }
            LoginService.loginUser($scope.data.username, $scope.data.password)
            .then(function(data) {
                $scope.$root.login = data;
                if ($scope.$root.consultant)
	                $state.go('tab.notes');
                else 
	                $state.go('tab.consultants');
            	},
            	function(data) {
                	var alertPopup = $ionicPopup.alert({
                    	title: 'Login failed!',
                    	template: 'Please check your credentials!'
                	});
            	});
        }

    })

    .controller('ConsultantsCtrl', ["$scope", "ConsultantList", "$state", function($scope, ConsultantList, $state) {
    	$scope.consultants = [];
        
        $scope.refresh = function() {
            ConsultantList.retrieve().then(function(response){
                $scope.consultants = response;
            });
        };
        
        $scope.refresh();
        $scope.choose = function(consultant) {
        	$scope.$root.consultant = consultant;
            $state.go('tab.notes');
        }
	}])

    .controller('NotesCtrl', ["$scope", "NotesList", "$state", function($scope, NotesList, $state) {
        $scope.notes = [];
        
        $scope.refresh = function() {
            NotesList.retrieve($scope.$root.consultant.proca).then(function(response){
                var notes = [];
                var i = 0;
                for (i=0; i<response.length; i++){
                    if (response[i].note) {
                        notes.push(response[i]);
                    }
                }
                $scope.notes = notes;
            });
        };
        
        if ($scope.$root.consultant === undefined) {
        	$state.go('tabs.consultants');
        } else {
            $scope.consultant = $scope.$root.consultant;
            $scope.refresh();
        }
	}])

;
}());