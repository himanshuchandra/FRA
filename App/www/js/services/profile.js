'use strict';

/**
 * @ngdoc service
 * @name appskeleton.profile
 * @description
 * # profile
 * Factory in the appskeleton.
 */
angular.module('appskeleton')
  .factory('profile', function ($http,$q,requrl,$localStorage) {

    var object = {
        /*Optional call if loading data from session
        getData:function(){

            var dataObject={
                appCall:true,
                sessionid:$localStorage.sessionid
            };

          var defer = $q.defer(); 
          $http.post(requrl+'/profile/getData',dataObject)
          .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;
        },*/

        checkUsername:function(usernameObj){
           var defer = $q.defer();
           $http.post(requrl+'/commonroutes/checkUsername',usernameObj)
           .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;
        },
        
       changeUsername:function(usernameObject){
           usernameObject.appCall=true;
           usernameObject.sessionid=$localStorage.sessionid;
            
            var defer=$q.defer();
            $http.post(requrl+"/profile/changeUsername",usernameObject)
            .then(function(data){
                defer.resolve(data); 
            },function(error){
                defer.reject(error);
            })
            return defer.promise;
        },

        updateProfileData:function(profileObject){
            profileObject.appCall=true;
            profileObject.sessionid=$localStorage.sessionid;

            var defer=$q.defer();
            $http.post(requrl+"/profile/updateProfileData",profileObject)
            .then(function(data){
                defer.resolve(data); 
            },function(error){
                defer.reject(error);
            })
            return defer.promise;
        },

        updateMobile:function(mobileObject){
            mobileObject.appCall=true;
            mobileObject.sessionid=$localStorage.sessionid;

            var defer=$q.defer();
            $http.post(requrl+"/profile/updateMobile",mobileObject)
            .then(function(data){
                defer.resolve(data); 
            },function(error){
                defer.reject(error);
            })
            return defer.promise;
        },

        verifyCode:function(codeObject){
            codeObject.appCall=true;
            codeObject.sessionid=$localStorage.sessionid;
            var defer=$q.defer();
            $http.post(requrl+"/profile/verifyCode",codeObject)
            .then(function(data){
                defer.resolve(data); 
            },function(error){
                defer.reject(error);
            })
            return defer.promise;
        },

        setNewPassword:function(passwordObject){
            passwordObject.appCall=true;
            passwordObject.sessionid=$localStorage.sessionid;
            var defer=$q.defer();
            $http.post(requrl+"/profile/setNewPassword",passwordObject)
            .then(function(data){
                defer.resolve(data); 
            },function(error){
                defer.reject(error);
            })
            return defer.promise;
        },

    };
    return object;

  });
