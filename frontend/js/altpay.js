// altpay.js

app = function() {
  var altpay = angular.module('altpay', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

  altpay.service('LoginService', ['$rootScope', '$sessionStorage', function($rootScope, $sessionStorage) {
    
    this.setProfile = function(profile) {
      $rootScope.profile = profile;
      $sessionStorage.profile = profile;
    };

    this.getProfile = function() {
      return $rootScope.profile;
    };

    this.setToken = function(token) {
      $rootScope.token = token;
      $sessionStorage.token = token;
    };

    this.getToken = function() {
      return $rootScope.token;
    };

    this.isLoggedIn = function() {
      //checks if you've got a profile set in rootscope or sessionStorage
      if ($rootScope.profile) {
        return $rootScope.profile;
      } else if ($sessionStorage.profile && $sessionStorage.profile) {
        this.setProfile($sessionStorage.profile);
        this.setToken($sessionStorage.token);
        return $rootScope.profile;
      }
      return undefined;
    };

  }]);

  altpay.controller('LoginController', ['$location', '$scope','$http', 'LoginService',
    function($location, $scope, $http, $LoginService) {

    $scope.login = function() {

      $http.post('/login', {
        params: {
          email: $scope.email,
          password: $scope.password
        }
      })
      .success(function(data, status, headers, config) {
        if (data.success) {
          LoginService.setToken(data.token);
          $location.url('/transactions');

          $http.get('/profile', {
            headers: {
              'x-access-token': LoginService.getToken()
            }
          })
          .success(function(data, status, headers, config) {
            if (data) {
              LoginService.setProfile(data);
            }
          });
        } else {
          $scope.message = "Login failed.";
        }
      });
    }

  }]);

  altpay.controller('TransactionController', ['$location', '$scope', '$http', 'LoginService',
    function($location, $scope, $http, LoginService) {

    if (!LoginService.isLoggedIn()) {
      $location.url('/login');
    } else {
      $scope.update();
    }

    $scope.update = function() {
      // get transactions here
      //$http.get()
    };

  }]);

  altpay.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'LoginController'
    })
    .when('/transactions', {
      templateUrl: 'partials/transactions.html',
      controller: 'TransactionController'
    })
    .otherwise({
      redirectTo: '/login'
    });
  }]);

};

app();