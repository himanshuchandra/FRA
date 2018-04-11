# ngGoogleMaps

Simplest Angular directive for Google Maps offering following features:

  - Road maps
  - Markers with customizable icons and event handlers
  - InfoWindow
  - Directions and waypoints

## Installation
#### Via npm
```sh
$ npm install ng-simple-google-maps --save
```
#### Via bower
```sh
$ bower install ng-simple-google-maps --save
```
#### Getting started
Include the module's script file in your HTML page
```html
<script defer src="https://maps.googleapis.com/maps/api/js?key=[YOUR_GOOGLE_MAPS_API_KEY]"></script>
<script src="bower_components/ng-simple-google-maps/dist/ng-google-maps.min.js"></script>
```
Inject the module as a dependency into your main Angular module as below:
```javascript
angular.module('myApp', ['ngGoogleMaps']);
```
#### Directive
Now you can use the the Google Maps directive to display the basic google map in you web page as following:

HTML Example
```html
<ng-google-maps id="maps"></ng-google-maps>
```

CSS Example
```css
#maps {
    width: 100%;
    height: 400px;
}
```
#### Attributes
Attribute     | Description | Required
------------- | ----------- | ---------
***options***  | Options for initializing the map with desired *zoom* factor, *center* coordinates etc. | Optional
***markers***  | An array of *markers*. Every marker object must specify *position* in terms of latitude and longitude | Optional
***route***    | An array of position coordinates with first object as the *source* and last as the *destination* with any other intervening positions as *waypoints* | Optional
***info***     | *InfoWindow* tooltip options | Optional
***resize***   | *Boolean* for resizing map on any event | Optional
#### Examples
* **Options**

You can pass the options from from your controller as following:
```javascript
angular.module('myApp', ['ngGoogleMaps'])
    .controller('MapController', ['$scope', function($scope) {
		
		$scope.mapOptions = {
			center: {position: {lat: 43.9124, lng: 75.7873}},
			zoom: 8
		};
	}]);
```
```html
<ng-google-maps id="maps" options="mapOptions"></ng-google-maps>
```

* **Markers**

Pass an array of marker objects from your controller as shown below:
```javascript
angular.module('myApp', ['ngGoogleMaps'])
    .controller('MapController', ['$scope', function($scope) {
		
		$scope.mapMarkers = [{
			title: 'Paris',
			position: {lat: 45.5124, lng: -74.7864}
		}, {
		    title: 'Milan',
			position: {lat: 49.5124, lng: -76.2864}
		}];
	}]);
```
```html
<ng-google-maps id="maps" markers="mapMarkers"></ng-google-maps>
```
***Note***: The directive dynamically computes the bounds of all the markers to support autofit initialization.

**Marker icon**: You can use custom marker icons and images to denote different markers on the map using *icon* property.
**Marker events**: You can define actions of event handlers for markers for *click* and *mouseover* events.
```javascript
$scope.mapMarkers = [{
	title: 'Los Angeles, CA',
	position: {lat: 34.0522, lng: 118.2437},
	icon: './resources/icons/map/city.png',
	click: function() {
		// Do something here
	},
	mouseover: function() {
		// Do something here
	}
}];
```
* **Route**

The *route* attribute allows you to display dirctions and waypoints in road map between two distinct locatiions. You can pass this information from your controller as shown below:
```javascript
angular.module('myApp', ['ngGoogleMaps'])
    .controller('MapController', ['$scope', function($scope) {
		
		$scope.mapRoute = [{
			position: {lat: 45.5124, lng: -74.7864} // Source
		}, {
			position: {lat: 47.5124, lng: -75.2864} // Waypoint
		}, {
			position: {lat: 49.5124, lng: -78.2864} // Destination
		}];
	}]);
```
```html
<ng-google-maps id="maps" route="mapRoute"></ng-google-maps>
```
***Note***: The *route* array must contain at least two locations, i.e., source and destination and any number of waypoint locations in between.

* **InfoWindow**

The *info* attribute enables you to display InfoWindow toooltip in the map at a desired event. You can pass the InfoWindow object from your controller as shown below:
```javascript
angular.module('myApp', ['ngGoogleMaps'])
    .controller('MapController', ['$scope', function($scope) {
		
		$scope.infoWindowOptions = {
		    content: '<div><h3>Info</h3><p>Location</p></div>'
		};
	}]);
```
```html
<ng-google-maps id="maps" info="infoWindowOptions"></ng-google-maps>
```
You can also position the *InfoWindow* around a marker by using the *marker* property as shown below:
```javascript	
$scope.infoWindowOptions = {
    content: '<div><h3>Info</h3><p>Location</p></div>',
    marker: {
        position: {lat: 22.6705, lng: 77.6424}, // Required
        title: 'Marker Title (optional)',
        /* Other optional properties for a marker */
    }
};
```
In case you want to display the InfoWindow around a marker that is already present in the map using the *markers* attribute, then you can pass the index of the marker in the array in your controller using the *index* property as following:
```javascript
angular.module('myApp', ['ngGoogleMaps'])
    .controller('MapController', ['$scope', function($scope) {
        $scope.mapMarkers = [{
			title: 'Paris',
			position: {lat: 45.5124, lng: -74.7864}
		}, {
		    title: 'Milan',
			position: {lat: 49.5124, lng: -76.2864}
		}];
		
		$scope.infoWindowOptions = {
		    content: '<div><h3>Paris</h3><p>Viva la France</p></div>',
		    index: 0
		};
	}]);
```
```html
<ng-google-maps id="maps" markers="mapMarkers" info="infoWindowOptions"></ng-google-maps>
```

* **Map resize**

The map resizes to fit into a resized container or *div* dynamically when the value of *resize* attribute is set to *true*.

```html
<ng-google-maps id="maps" resize="true"></ng-google-maps>
```
