'use strict';

/**
 * @ngdoc service
 * @name appskeleton.login
 * @description
 * # login
 * Factory in the appskeleton
 */
angular.module('appskeleton')
  .factory('login', function ($http,$q,requrl,$localStorage) {

    var object = {

        loginUser:function(loginObject){
            loginObject.appCall=true;
          var defer = $q.defer(); 
          $http.post(requrl+'/login/login',loginObject)
          .then(function(data){
                  
                  $localStorage.$default({
                    sessionid: ''
                });
               $localStorage.sessionid=data.data.sessionid;

               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;
        },

    };
    return object;

});
