'use strict';

(function() {
    
    
var SERVER="http://6f02170e.ngrok.io";
    
angular.module('amnch-handover')

  .service('LoginService', ["$q", "$http", function($q, $http) {
    
    // Login is implemented via /teams/api/logon
    // There are two parameters, username / password
    // on success, it returns a restful response with a success value = true
    // on invalid credentials it redirects to /teams/logon.jsp
    
    return {
        loginUser: function(username, password) {
            var deferred = $q.defer();
            
            var promise = deferred.promise;
            
            var url = SERVER + "/teams/api/logon";
            var data = {username: username, password: password}
            $http.post(url, data).then(
                function(response){
                    if (response.data.success)
	                    deferred.resolve(response.data);
                    else
		                deferred.reject('Logon failed.');
                }, 
                function(response) {
	               deferred.reject('Logon failed.');
                });
            
        	return promise;
        }
    };
  }])

  .service('ConsultantList', ["$q", "$http", function($q, $http) {
    
    // Retrieve the consultants list
      
    return {
        retrieve: function() {
            var deferred = $q.defer();
            var promise = deferred.promise;
            
            var url = SERVER + "/teams/api/consultant-list";
            $http.get(url).then(
                function(response){
                     deferred.resolve(response.data);
                }, 
                function(response) {
	               deferred.reject('Retrieve failed.');
                });
            
        	return promise;
        }
    };
  }])



  .service('NotesList', ["$q", "$http", function($q, $http) {
    
    // Retrieve the notes list
      
    return {
        retrieve: function(proca) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            
            var url = SERVER + "/teams/api/handover-notes";
            $http.get(url, {proca: proca}).then(
                function(response){
                     deferred.resolve(response.data);
                }, 
                function(response) {
	               deferred.reject('Retrieve failed.');
                });
            
        	return promise;
        }
    };
  }])


;
}());    