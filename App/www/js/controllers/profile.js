'use strict';

/**
 * @ngdoc function
 * @name appskeleton.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the appskeleton
 */
angular.module('appskeleton')
  .controller('ProfileCtrl', function ($scope,$window,$state,appindex,profile,md5,$localStorage,$timeout) {

    if($localStorage.sessionid===undefined){
      $window.location.reload(); 
      $state.go("app.login");
    }

      $scope.profile={
          newUsername:"",
          newName:"",
          newArea:"",
          newCity:"",
          newState:"",
          newPincode:"",
          newCountry:"",
          countryCode:"",
          newMobile:"",
          VCode:"",
          oldPassword:"",
          newPassword:"",
          newPassword2:""
      };

      $scope.ProfileForm=true;
      $scope.MobileForm=true;
      $scope.PasswordForm=true;
      $scope.UsernameForm=true;
      $scope.toggleButton=false;
      $scope.EditUsername="Edit Username";


//////Loading data from index service 
    $scope.loadData=function(){
        if(appindex.userData.useremail!=undefined){
          var print=appindex.userData;
          var userInfo=appindex.userData.userinfo;

          $scope.Email=print.useremail;
          $scope.uName=print.username;
          if(print.mobile!=undefined){
              $scope.Mobile=print.mobile;
          }
          if(userInfo){
            $scope.Name=userInfo.fullname;
            $scope.Area=userInfo.area;
            $scope.City=userInfo.city;
            $scope.Pincode=userInfo.pincode;
            $scope.State=userInfo.state;
            $scope.Country=userInfo.country;
            $scope.FillPlaceholders();
          }
        }
        else{  
            $window.location.reload(); 
            $state.go("app.login");
        }
    };

    $scope.$watch(function(){return appindex.userData},function(newValue,oldValue){
        if(!angular.equals(appindex.userData, {})){
          $scope.loadData(); 
        }
    },true);

  /* Optional function to load profile data from session instead of index service
    $scope.checkLogin=function(){

      var promise = profile.getData();
      promise.then(function(data){

          var print=data.data;
          var userInfo=data.data.userinfo;
          if(print.useremail==undefined){
            $window.location.reload(); 
            $location.path("app/login");
          }
          else{
            $scope.Email=print.useremail;
            $scope.uName=print.username;
            if(print.mobile!=undefined){
                $scope.Mobile=print.mobile;
            }
            if(userInfo){
              $scope.Name=userInfo.fullname;
              $scope.Area=userInfo.area;
              $scope.City=userInfo.city;
              $scope.Pincode=userInfo.pincode;
              $scope.State=userInfo.state;
              $scope.Country=userInfo.country;
              $scope.FillPlaceholders();
            }
          }
      },function(error){
          $window.location.reload();
          $location.path("app/login");
      });
    };

    if($localStorage.sessionid===undefined){
      $window.location.reload(); 
      $location.path("app/login");
    }
    else{
      $scope.checkLogin();
    }
    */

 //////////// Show-Hide form button logic  ////////
    $scope.ShowProfileForm=function(){
      $scope.ProfileForm=false;
      $scope.ProfileFormButton=true;
      $scope.MobileFormButton=false;
      $scope.PasswordFormButton=false;
      $scope.MobileForm=true;
      $scope.PasswordForm=true;
      $scope.Profile=true;
      $scope.UsernameForm=true;
      $scope.toggleButton=false;
      $scope.EditUsername="Edit Username";
    };

    $scope.ShowMobileForm=function(){
      $scope.MobileForm=false;
      $scope.MobileFormButton=true;
      $scope.ProfileFormButton=false;
      $scope.PasswordFormButton=false;
      $scope.PasswordForm=true;
      $scope.ProfileForm=true;
      $scope.Profile=false;
      $scope.UsernameForm=true;
      $scope.toggleButton=false;
      $scope.EditUsername="Edit Username";
    }

    $scope.ShowPasswordForm=function(){
      $scope.PasswordForm=false;
      $scope.PasswordFormButton=true;
      $scope.ProfileFormButton=false;
      $scope.MobileFormButton=false;
      $scope.MobileForm=true;
      $scope.ProfileForm=true;
      $scope.Profile=false;
      $scope.UsernameForm=true;
      $scope.toggleButton=false;
      $scope.EditUsername="Edit Username";
    }

    $scope.toggleUsernameForm=function(){
      $scope.ProfileForm=true;
      $scope.ProfileFormButton=false;
      $scope.MobileFormButton=false;
      $scope.PasswordFormButton=false;
      $scope.MobileForm=true;
      $scope.PasswordForm=true;
      $scope.Profile=false;

      if($scope.UsernameForm==true){
        $scope.UsernameForm=false;
        $scope.EditUsername="Cancel";
      }
      else{
        $scope.UsernameForm=true;
        $scope.EditUsername="Edit Username";
      }  
  };

///////////// Edit profile logic //////////////
    $scope.FillPlaceholders=function(){
          $scope.profile.newName=$scope.Name;
          $scope.profile.newArea=$scope.Area;
          $scope.profile.newCity=$scope.City;
          $scope.profile.newPincode=$scope.Pincode; 
          $scope.profile.newState=$scope.State;
          $scope.profile.newCountry=$scope.Country;
    }

    $scope.submitProfileForm=function (profForm) {  
        if(profForm.$valid && $scope.profile.newCountry!=undefined){
          $scope.ProfileResult="Saving";
          $scope.changeProfile();
        }
        else if($scope.profile.newCountry==undefined){
          $scope.dataValid="Choose a country";
        }
        else{
          $scope.dataValid="Wrong or Incomplete info";
        }
    };

    $scope.changeProfile=function () {
        var country=$scope.profile.newCountry.replace(/['"]+/g,'');
        var profileObject={
          "fullname":$scope.profile.newName,
          "area":$scope.profile.newArea,
          "city":$scope.profile.newCity,
          "state":$scope.profile.newState,
          "pincode":$scope.profile.newPincode,
          "country":country,
        };
        
        var promise=profile.updateProfileData(profileObject);
        promise.then(function(data) {
          if(data.data.message==="unknown"){
            $scope.ProfileResult="Not LoggedIn";
            $window.location.reload();
          }
          else if(data.data.message==="success"){
            $scope.ProfileResult="Updated";
            appindex.needReload=true;
            $state.transitionTo("app.profile",null, {reload: true});
          }
          else{
            $scope.ProfileResult="Error! Try again later";
          }
        },function(error) {
            $scope.ProfileResult="Error! Try again later";
        });
    };

///////////////Add/Change Mobile no. logic ////////////////
    $scope.HideMobileForm=false;
    $scope.HideCodeForm=true;

    $scope.submitMobileForm=function(mobileForm){
        if(mobileForm.$valid){
            $scope.MobileMessage="Sending..";
            $scope.ChangeMobile();
        }
        else{
            $scope.MobileMessage="Enter valid details";
        }
    };

    $scope.ChangeMobile=function(){
  
        var MobileObject={
          "CountryCode":"+"+$scope.profile.countryCode,
          "MobileNumber":$scope.profile.newMobile,
        };

        var promise=profile.updateMobile(MobileObject);
        promise.then(function(data) {
          if(data.data.message==="unknown"){
            $window.location.reload();
          }
          else if(data.data.message==="success"){
            $scope.HideMobileForm=true;
            $scope.HideCodeForm=false;
          }
          else{
            $scope.MobileMessage="Error! Try again later";
          }
        },function(error) {
            $scope.MobileMessage="Error! Try again later";
        });    
    };

    $scope.submitCode=function(codeForm){
      if(codeForm.$valid){
        $scope.CodeMessage="Checking Code..";
        $scope.VerifyCode();          
      }
      else{
        $scope.CodeMessage="Enter valid code";
      }
    };

    $scope.VerifyCode=function(){
        var CodeObject={
          "VCode":$scope.profile.VCode,
        };

        var promise=profile.verifyCode(CodeObject);
        promise.then(function(data) {
          if(data.data.message==="pass"){
            $scope.CodeMessage="Verified & Updated";
            appindex.needReload=true; 
            $state.transitionTo("app.profile",null, {reload: true});
          }
          else if(data.data.message==="fail"){
            $scope.CodeMessage="Wrong Code entered";
          }
          else if(data.data.message==="unknown"){
            $scope.CodeMessage="Not LoggedIn";
            $window.location.reload();
          }
          else if(data.data.message==="exists"){
            $scope.CodeMessage=undefined;
            $scope.HideMobileForm=false;
            $scope.HideCodeForm=true;
            $scope.profile.VCode=undefined;
            $scope.MobileMessage="Mobile no. is already registered! Try another one";
          }
          else{
            $scope.CodeMessage="Error! Try again later";
          }
        },function(error) {
            $scope.CodeMessage="Error! Try again later";
        });    
    };

    $scope.SendAgain=function(){
        $scope.profile.VCode=null;
        $scope.CodeMessage=undefined;
        $scope.MobileMessage=undefined;
        $scope.HideMobileForm=false;
        $scope.HideCodeForm=true;
    };

/////////// Change Password Logic /////////////////
    var arePasswordsSame=false;

    $scope.checkPassword=function(){
      if($scope.profile.newPassword2!=undefined)
      {   
          if($scope.profile.newPassword===$scope.profile.newPassword2)
          {   
            $scope.PasswordMessage="Passwords match";
            arePasswordsSame=true;            
          }
          else if($scope.profile.newPassword==undefined){
              $scope.PasswordMessage=undefined;
              arePasswordsSame=false;
          }
          else{
            $scope.PasswordMessage="Passwords dont match";
            arePasswordsSame=false;
          }
      }
    };

    $scope.submitPasswordForm=function(passForm){
        if(passForm.$valid && arePasswordsSame==true){
              $scope.changePassword();
              $scope.PasswordResult="Updating Password";
      }
      else{
        $scope.PasswordResult="Enter correct passwords";
      }
    };
    
    $scope.changePassword=function () {

      var hashOldPassword=md5.createHash($scope.profile.oldPassword);
      var hashNewPassword=md5.createHash($scope.profile.newPassword);
      var passwordObject={
          "oldpassword":hashOldPassword,
          "password1":hashNewPassword,
    };
        
    var promise=profile.setNewPassword(passwordObject);
    promise.then(function(data) {
      if(data.data.message==="success"){
          $scope.PasswordResult="Updated";
          $state.transitionTo("app.profile",null, {reload: true});
      }
      else if(data.data.message==="unknown"){
          $scope.PasswordResult="Not LoggedIn";
          $window.location.reload();
      }
      else if(data.data.message==="fail"){
          $scope.PasswordResult="Old Password is not correct";
      }
      else{
          $window.location.reload();
      }
      },function(error) {
          $scope.PasswordResult="Error occured! Try again later";
      });
    };
    
///////////// Change Username  ////////////////
    $scope.UsernameMessage=null;
    var isUsernameNew=false;
    $scope.disableButton=true;

    $scope.checkUsername=function(usernameForm){
        $scope.disableButton=true;
        isUsernameNew=false;
        $scope.UsernameMessage=null;
        if($scope.profile.newUsername===$scope.uName){
          $scope.UsernameMessage="Same as current username";
        }
        else if(usernameForm.newusername.$valid){
          $scope.UsernameMessage="Checking...";
          $scope.checkInDb();
        }
    };

    $scope.checkInDb=function(){
        var usernameObj = {
          "username":$scope.profile.newUsername,
        };
        
        var promise = profile.checkUsername(usernameObj);
        promise.then(function(data){
          if(data.data.message==="found"){
              $scope.UsernameMessage = "Username Taken";
          }
          else{
              $scope.UsernameMessage = "Nice Choice!";
              isUsernameNew=true;
              $scope.disableButton=false;
          }            
        },function(error){
          $scope.UsernameMessage = "Error occured! Try again later";
        });
    };


    $scope.submitUsernameForm=function(usernameForm){
      
      if(usernameForm.$valid && isUsernameNew==true){
        $scope.toggleButton=true;
        $scope.UsernameResult="Checking username..";
        $scope.ChangeUsername();
      }
      else{
          $scope.UsernameResult="Enter a valid username";
      }
    };

    $scope.ChangeUsername=function(){
      
      var UsernameObject={
        "Username":$scope.profile.newUsername
      }
      var promise=profile.changeUsername(UsernameObject);
      promise.then(function(data){
        if(data.data.message==="success"){
          $scope.UsernameResult="Username changed";
          appindex.needReload=true; 
          $state.transitionTo("app.profile",null, {reload: true});
        }
        else if(data.data.message==="unknown"){
          $scope.UsernameResult="Not LoggedIn";
          $window.location.reload();
        }
        else if(data.data.message==="taken"){
          isUsernameNew=false;
          $scope.UsernameMessage = "Username Taken";
          $scope.UsernameResult="Username already taken";
          $scope.toggleButton=false;
        }
        else{
          $scope.UsernameResult="Error occured!Try again Later";
        }
      },
      function(error){
        $scope.UsernameResult="Error occured!Try again Later";
      });
    };
       
 
  });
