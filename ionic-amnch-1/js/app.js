'use strict';

(function() {
    angular.module( "amnch-handover", [ "ionic" ])
    
        .run(function($ionicPlatform) {

          $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
              cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
              cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
              // org.apache.cordova.statusbar required
              StatusBar.styleDefault();
            }
          });
		})

        .config(function($stateProvider, $urlRouterProvider) {
			$stateProvider    
              .state('login', {
             	 url: '/login',
                 controller: 'LoginCtrl',
             	 templateUrl: 'templates/login.html'
              })
            
              .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
              })

              .state('tab.dash', {
                url: '/dash',
                views: {
                  'tab-dash': {
                    templateUrl: 'templates/tab-dash.html',
                    controller: 'DashCtrl'
                  }
                }
              })

            
  			;
        	$urlRouterProvider.otherwise('/login');
    	})
    
    ;
}());
