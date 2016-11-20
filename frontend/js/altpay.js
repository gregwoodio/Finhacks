// altpay.js

app = function() {
  var altpay = angular.module('altpay', ['ngRoute', 'ngAnimate', 'ui.bootstrap','ngStorage']);

  altpay.factory('LoginService', ['$rootScope', '$sessionStorage','$http', function($rootScope, $sessionStorage, $http) {

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
      $http.defaults.headers.common = { 'x-access-token' : token };
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

    return this;

  }]);

  altpay.controller('LoginController', ['$location', '$scope','$http', 'LoginService',
    function($location, $scope, $http, LoginService) {

    $scope.login = function() {
      console.log("hello i got here");
      $http.post('/login', {
        email: $scope.email,
        password: $scope.password
      })
      .success(function(data, status, headers, config) {
        if (data.success) {
          console.log("hello i got here in the success");

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
      })
      .error(function (err) {
        console.error(err);
      });
    }

  }]);

  altpay.controller('TransactionController', ['$location', '$scope', '$http', 'LoginService', function($location, $scope, $http, LoginService) {

    $scope.transactions = [];

    $scope.update = function() {
      // get transactions here
      $http.get("/transactions").success(function (data) {
        console.log(data);
        var i = 0;
          $scope.transactions = data;
      })
    };

    if (!LoginService.isLoggedIn()) {
      $location.url('/login');
    } else {
      $scope.update();
    }



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
