'use strict';

/**
 * @ngdoc function
 * @name appskeleton.controller:ForgotpasswordCtrl
 * @description
 * # ForgotpasswordCtrl
 * Controller of the appskeleton
 */
angular.module('appskeleton')
  .controller('ForgotpasswordCtrl', function ($scope,forgotpassword,md5) {

    $scope.forgotpassword={
      ForgotEmail:""
    };

  ///////////////////////////////////////////
    $scope.SendForm=false;
    $scope.sendAgainButton=true;

//////////////////////////////////////////////////
     $scope.submitForm=function(forgotForm) {
        if(forgotForm.$valid){
          $scope.SendLink();
        }
    };

     $scope.SendLink=function() {
      
        var ForgotObject={
            "Email":$scope.forgotpassword.ForgotEmail,
        };
        
        var promise=forgotpassword.sendLink(ForgotObject);
        promise.then(function(data){
          if(data.data.message==="sent"){
            $scope.result = "Link Sent";
            $scope.SendForm=true;
            $scope.sendAgainButton=false;
          }
          else if(data.data.message==="notFound"){
            $scope.result = "Email not found";
          }
          else{
            $scope.result = "Error occurred! Try again Later.";
          }
        },function (error) {
            $scope.result = "Error occurred! Try again Later.";
        });
      }; 

      $scope.sendAgain=function(){
        $scope.SendForm=false;
        $scope.sendAgainButton=true;
        $scope.forgotpassword.ForgotEmail=undefined;
        $scope.result=undefined;
      };

  });
