'use strict';

/**
 * @ngdoc service
 * @name appskeleton.socialsignin
 * @description
 * # socialsignin
 * Factory in the appskeleton.
 */
angular.module('appskeleton')
  .factory('socialsignin', function ($q,$http,requrl,$localStorage) {

    var object = {

        socialSignin:function(SocialObject){   
            SocialObject.appCall=true;
          var defer = $q.defer(); 
          $http.post(requrl+'/commonroutes/socialSignin',SocialObject)
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
