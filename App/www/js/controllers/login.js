'use strict';

/**
 * @ngdoc function
 * @name appskeleton.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the appskeleton
 */
angular.module('appskeleton')
  .controller('LoginCtrl', function ($scope,login,$window,$state,md5) {

      $scope.login={
        loginid:"",
        loginpassword:"",
      };
      
     $scope.submitForm=function(loginForm){
        if(loginForm.$valid){
            $scope.result="Checking..";
            $scope.doLogin();
        }
        else{
            $scope.result="Invalid info.";
        }
    };
    
    
    $scope.doLogin=function(){
        
        var hashLoginPassword=md5.createHash($scope.login.loginpassword);

        var loginObject = {
            "loginid":$scope.login.loginid,
            "loginpassword":hashLoginPassword,
            "rememberMe":undefined
        };
        var promise = login.loginUser(loginObject);
        promise.then(function(data){
            if(data.data.message==="success"){
                $scope.result="Logged in successfully";
                $window.location.reload();
                $state.go("app.main");
            }
            else if(data.data.message==="conflict"){
                $scope.result="Please specify country code if using Mobile number";
            }
            else if(data.data.message==="fail"){
                $scope.result="Wrong Email/Username/Mobile or password";
            }
            else{
                $scope.result="Error occurred! Try again later.";
            }
        },function(error){
            $scope.result = "Error occurred! Try again later.";
        });
    };
  
  });
