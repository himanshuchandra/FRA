'use strict';

/**
 * @ngdoc function
 * @name appskeleton.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the appskeleton
 */
angular.module('appskeleton')
  .controller('AboutCtrl', function ($scope, $timeout, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet, requrl) {

    $scope.default='img/default.jpg';
    $scope.galImage = '';
    $scope.loading = true;
    $scope.fresults={};
    var imgUrl = requrl+"/User_data/target.jpeg";

        ////////Optional method
    $scope.uploadPhoto = function (imageURI) {
      $scope.fresults={};
      $scope.loading = false;
      var options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
      options.mimeType = "image/jpeg";
      console.log(options.fileName);
      var params = new Object();
      params.value1 = "test";
      params.value2 = "param";
      options.params = params;
      options.chunkedMode = false;

      var ft = new FileTransfer();
      ft.upload(imageURI, requrl + "/analyzer/uploadPic", function (result) {
        var data= JSON.stringify(result.response);
        data = JSON.parse(data);
        var resString = JSON.stringify(data);
        var resJSON = JSON.parse(JSON.parse(resString));
        console.log("resulttt",resJSON);
        if(resJSON.message === 'none'){
          $scope.showAlert('Fail', 'Not found!');
        }
        else{
          $scope.fresults=resJSON.message;
          $scope.showAlert('Success', 'Finished Processing!');
        }
        $scope.galImage = imgUrl;
        $scope.loading = true;
      }, function (error) {
        console.log(JSON.stringify(error));
        $scope.loading = true;
      }, options);
    }

    $scope.getImage = function () {
      $scope.galImage = '';
      navigator.camera.getPicture($scope.uploadPhoto, function (message) {
        alert('Get picture failed!');
      }, {
          quality: 100,
          destinationType: navigator.camera.DestinationType.FILE_URI,
          sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
        });

    }

    ////////////////////////////

    $scope.showAlert = function (title, msg) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: msg
      });
    };

    $scope.loadImage = function () {
      $scope.fresults={};
      var options = {
        title: 'Select Image Source',
        buttonLabels: ['Use Camera'],
        addCancelButtonWithLabel: 'Cancel',
        androidEnableCancelButton: true,
      };
      $cordovaActionSheet.show(options).then(function (btnIndex) {
        var type = null;

        if (btnIndex === 1) {
          type = Camera.PictureSourceType.CAMERA;
          // type = Camera.PictureSourceType.PHOTOLIBRARY;
        }
        // else if (btnIndex === 2) {
        //   type = Camera.PictureSourceType.CAMERA;
        // }
        if (type !== null) {
          $scope.selectPicture(type);
        }
      });
    };

    $scope.selectPicture = function (sourceType) {
      $scope.galImage = '';
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: sourceType,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imagePath) {
        // Grab the file name of the photo in the temporary directory
        var currentName = imagePath.replace(/^.*[\\\/]/, '');

        //Create a new name for the photo
        var d = new Date(),
          n = d.getTime(),
          newFileName = n + ".jpg";
          if (newFileName === null) {
            return '';
          } else {
            $scope.default= cordova.file.dataDirectory + newFileName;
          }
        // If you are trying to load image from the gallery on Android we need special treatment!
        if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
          window.FilePath.resolveNativePath(imagePath, function (entry) {
            window.resolveLocalFileSystemURL(entry, success, fail);
            function fail(e) {
              console.error('Error: ', e);
            }

            function success(fileEntry) {
              var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
              // Only copy because of access rights
              $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function (success) {
                console.log("library",$scope.image);
                $scope.image = newFileName;
              }, function (error) {
                $scope.showAlert('Error', error.exception);
              });
            };
          }
          );
        } else {
          var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          // Move the file to permanent storage
          $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
            $scope.image = newFileName;
            console.log("camera",$scope.image);
          }, function (error) {
            $scope.showAlert('Error', error.exception);
          });
        }
      },
        function (err) {
          // Not always an error, maybe cancel was pressed...
        })
    };

    // Returns the local path inside the app for an image
    $scope.pathForImage = function (image) {
      if (image === null) {
        return '';
      } else {
        return cordova.file.dataDirectory + image;
      }
    };



    $scope.uploadImage = function() {
      $scope.loading = false;
      // Destination URL
      var url = requrl + "/analyzer/uploadPic";

      // File for Upload
      var targetPath = $scope.pathForImage($scope.image);

      // File name only
      var filename = $scope.image;;

      var options = {
        fileKey: "file",
        fileName: filename,
        chunkedMode: false,
        mimeType: "multipart/form-data",
        params : {'fileName': filename}
      };

      $cordovaFileTransfer.upload(url, targetPath, options).then(function(result) {
        var data= JSON.stringify(result.response);
        data = JSON.parse(data);
        var resString = JSON.stringify(data);
        var resJSON = JSON.parse(JSON.parse(resString));
        console.log("resulttt",resJSON);
        if(resJSON.message === 'none'){
          $scope.showAlert('Fail', 'Not found!');
        }
        else{
          $scope.fresults=resJSON.message;
          $scope.showAlert('Success', 'Finished Processing!');
        }
        $scope.loading = true;
      });
    }

  });
