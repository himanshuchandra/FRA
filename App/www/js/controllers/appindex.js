'use strict';

/**
 * @ngdoc function
 * @name appskeleton.controller:AppindexCtrl
 * @description
 * # AppindexCtrl
 * Controller of the appskeleton
 */
angular.module('appskeleton')
  .controller('AppindexCtrl', function ($scope,appindex,$window,$state,$ionicPopup,$timeout) {

     $scope.loginStatus="Login/SignUp";

     $scope.ActivationMessage=undefined;
     
     $scope.loadData=function(){
        var promise = appindex.checkStatus();
        promise.then(function(data){
            if(data.data.message==="fail"){
                $scope.loginStatus="Login/SignUp";
            }
            else if(data.data.Message!=undefined){
                $scope.loginStatus=data.data.Message;
                appindex.userData=data.data.userData;
                if(data.data.Email!=undefined && data.data.ActivationStatus===false){
                    $scope.activated=false;
                    $scope.Status="Your Email address "+data.data.Email+" is not Verified";
                }
                $scope.loggedOut=true;
                $scope.loggedIn=false;
            }
            else{
                $scope.loginStatus="Login/SignUp";
            }
            appindex.needReload=false;
        });
    };

    $scope.$watch(function(){return appindex.needReload},function(newValue,oldValue){
        if(appindex.needReload===true){
          $scope.loadData(); 
        }
    },true);

    $scope.loggedOut=false;
    $scope.loggedIn=true;
    $scope.activated=true;

    $scope.redirect=function(){
        $state.go("app.profile",{});
    };

    $scope.sendLink = function() {
        if(!$scope.sendLinkButton){
            var myPopup = $ionicPopup.show({
                template:  "<p>{{Status}}</p><p ng-hide='sendLinkButton'>Send a new activation link</p>{{ActivationMessage}}</p>",
                scope: $scope,
                buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Send Link</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        $scope.SendActivationLink();
                    }
                },
                ]
            });
        }
        else{
            var myPopup = $ionicPopup.show({
                template:  "<p>{{Status}}</p><p ng-hide='sendLinkButton'>Send a new activation link</p>{{ActivationMessage}}</p>",
                scope: $scope,
                buttons: [{ text: 'Cancel' },]
            });
        }
    };

    $scope.SendActivationLink=function(){
        var promise = appindex.sendActivationLink();
        promise.then(function(data){
            if(data.data.message==="success"){
                $scope.ActivationMessage="Link Sent. Wait for 1 minute to send new link";
                $scope.sendLinkButton=true;
                $timeout(function(){
                    $scope.sendLinkButton=false;
                    $scope.ActivationMessage=undefined;
                }, 60000);
            }
            else if(data.data.message==="unknown"){
                $window.location.reload();
            }
            else{
                $scope.ActivationMessage="Error,Try again Later";
            }
        },function(error){
            $scope.ActivationMessage="Error,Try again Later";
        });
      };

      ///////////////////////////////

    $scope.logout=function(){
        var confirmPopup = $ionicPopup.confirm({
            title: 'Logout?',
            template: 'Are you sure you want logout?'
        });
        confirmPopup.then(function(res) {
            if(res) {
                $scope.doLogout();
            } 
        });
    };

    $scope.doLogout=function(){
        var promise = appindex.logout();
        promise.then(function(data){
            $window.location.reload();
            $state.go("app.login");
        },function(error){
            $scope.LogoutMessage="Error,Try again Later";
        });
      };

  });
