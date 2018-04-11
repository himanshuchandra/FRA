'use strict';

/**
 * @ngdoc service
 * @name appskeleton.forgotpassword
 * @description
 * # forgotpassword
 * Factory in the appskeleton.
 */
angular.module('appskeleton')
  .factory('forgotpassword', function ($http,$q,requrl) {
      
      var object= {

        sendLink:function(ForgotObject){
          var defer = $q.defer(); 
          $http.post(requrl+'/forgotpassword/sendLink',ForgotObject)
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
