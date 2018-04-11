

/**
 * @ngdoc function
 * @name appskeleton.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appskeleton
 */
angular.module('appskeleton')
  .controller('MainCtrl', function ($scope, $ionicPlatform, $cordovaTouchID) {

    $scope.scanFinger = function () {
      alert("1");
      $ionicPlatform.ready(function () {
        // Is available
        if (typeof window.Fingerprint != 'undefined') {
          window.Fingerprint.isAvailable(isAvailableSuccess, isAvailableError);
          $scope.available = "Not checked";

          function isAvailableSuccess(result) {
            alert("present");
            $scope.available = true;
          }

          function isAvailableError(message) {
            alert("notPresent");
            $scope.available = "isAvailableError(): " + JSON.stringify(message);
            console.error(message);
          }

          if ($scope.available) {
            Fingerprint.show({
              clientId: "Fingerprint-Demo",
              clientSecret: "password" //Only necessary for Android
            }, successCallback, errorCallback);

            function successCallback() {
              alert("Authentication successfull");
            }

            function errorCallback(err) {
              alert("Authentication invalid " + err);
            }
          }
          else {
            alert($scope.available);
          }

        }
      });
    };

    $scope.scanIos = function () {
      $cordovaTouchID.checkSupport().then(function () {
        // success, TouchID supported
      }, function (error) {
        alert(error); // TouchID not supported
      });

      $cordovaTouchID.authenticate("text").then(function () {
        // success
      }, function () {
        // error
      });
    };

    ///////////Image capture
  var captureSuccess=function(mediaFiles) {
      alert("success");
      console.log(mediaFiles);
      // var i, len;
      // for (i = 0, len = mediaFiles.length; i < len; i += 1) {
      //     uploadFile(mediaFiles[i]);
      // }
  }

  var captureError=function(error) {
      var msg = 'An error occurred during capture: ' + error.code;
      alert(msg,'Uh oh!');
  }

    $scope.clickPic=function(){
        // Launch device camera application,
        // allowing user to capture up to 2 images
        navigator.device.capture.captureImage(captureSuccess, captureError, {limit: 1});

    }

  });
