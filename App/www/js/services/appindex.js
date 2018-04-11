'use strict';

/**
 * @ngdoc service
 * @name appskeleton.appindex
 * @description
 * # appindex
 * Factory in the appskeleton
 */
angular.module('appskeleton')
  .factory('appindex', function ($http,$q,requrl,$localStorage) {

    var object = {

        needReload:true,
        userData:{},

        checkStatus:function(){
            var statusObject={
                appCall:true,
                sessionid:$localStorage.sessionid
            }
          var defer = $q.defer(); 
          $http.post(requrl+'/webindex',statusObject)
          .then(function(data){
              if(data.data.sessionid!=undefined){
                  $localStorage.sessionid=data.data.sessionid;
              }
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;
        },

        sendActivationLink:function(){
            var linkObject={
                appCall:true,
                sessionid:$localStorage.sessionid
            }
          var defer = $q.defer(); 
          $http.post(requrl+'/sendActivationLink',linkObject)
          .then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;
        },
        

        logout:function(){
            var logoutObject={
                appCall:true,
                sessionid:$localStorage.sessionid
            }
            

          var defer = $q.defer(); 
          $http.post(requrl+'/logout',logoutObject)
          .then(function(data){

            $localStorage.$reset();

               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;
        }

    };
    return object;

});