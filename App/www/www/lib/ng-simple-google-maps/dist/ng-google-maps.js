angular.module('ngGoogleMaps', []);
(function(module) {
	module.directive('ngGoogleMap', function() {
		return {
			restrict: 'E',
			replace: true,
			template: '<div></div>',
			scope: {
				options: '=',
				markers: '=',
				route: '=',
				info: '=',
				resize: '='
			},
			link: function(scope, element, attrs) {
				var _map;
				var _markers = [];
				var _directionsService, _directionsDisplay;
				var _waypoints = [];
				var _bounds;
				var _infoWindow = null;

				function renderMap(id, options, callback) {
					options.center = new google.maps.LatLng(options.center.lat, options.center.lng);
					options.zoomControl = true;
					options.zoomControlOptions = {position: google.maps.ControlPosition.TOP_RIGHT};
					return callback(new google.maps.Map(document.getElementById(id), options));
				}

				function addMarker(marker) {
					return new google.maps.Marker({
						position: marker.position,
    					title: marker.title ? marker.title : '',
    					animation: google.maps.Animation.DROP,
    					icon: marker.icon ? marker.icon : attrs.markerIcon ? attrs.markerIcon : ''
					});
				}
				
				function addGenericMarker(marker) {
					return new google.maps.Marker(marker);
				}

				function renderMarkers(markers) {
					_markers.map(function(mm) {
						removeMarker(mm);
					});
					_markers = [];
					_bounds = new google.maps.LatLngBounds();
					markers.map(function(marker) {
						var m = addMarker(marker);
						if(marker.click && typeof marker.click === 'function')
							addOnClickListener(m, marker.click);
						if(marker.mouseover && typeof marker.mouseover === 'function')
							addOnMouseoverListener(m, marker.mouseover);
						_bounds.extend(m.position);
						_markers.push(m);
					});
					window.setTimeout(function() {
						_markers.map(function(m) {
							scope.$apply(function() {
								m.setMap(_map);
							});
						});
					}, 1000);
					if(_markers.length > 0){
						if(_markers.length == 1) {
							_map.setCenter(_markers[0].position);
							_map.setZoom(10);
						}
						else _map.fitBounds(_bounds);
					}
					else return;
				}

				function removeMarker(marker) {
					marker.setMap(null);
				}

				function spliceMarker(marker) {
					var index = _markers.indexOf(marker);
					if(index >= 0) {
						_markers[_markers.indexOf(marker)].setMap(null);
						_markers.splice(_markers.indexOf(marker), 1);
					}
				}

				function addOnClickListener(marker, handler) {
					marker.addListener('click', handler);
				}

				function addOnMouseoverListener(marker, handler) {
					marker.addListener('mouseover', handler);
				}

				function enableRandomMarkers() {
					google.maps.event.addListener(_map, 'click', function(e) {
		                scope.$apply(function() {
		                    var point = addMarker({
		                    	position: {lat: e.latLng.lat(), lng: e.latLng.lng()},
		                    	title: 'Clicked location'
		                    });
		                    point.setMap(_map);
		                });
		            });
				}

				function calculateAndDisplayRoute(route) {
					if(route && route.length >=2) {
						_directionsService.route({
						    origin: new google.maps.LatLng(route[0].lat, route[0].lng),
						    destination: new google.maps.LatLng(route[route.length - 1].lat, route[route.length - 1].lng),
						    waypoints: _waypoints,
						    optimizeWaypoints: true,
						    travelMode: google.maps.TravelMode.DRIVING
						}, function(response, status) {
						    if (status === google.maps.DirectionsStatus.OK) {
						    	_directionsDisplay.setMap(_map);
						      	_directionsDisplay.setDirections(response);
						    }
						});
					}
					else {
						_directionsDisplay.setMap(null);
					}
				}

				function resizeMap(callback) {
					window.setTimeout(function(){
						google.maps.event.trigger(_map, 'resize');
						return callback();
					}, 100);
				}

				function setMapCenter(coords) {
					_map.setCenter(coords);
				}

				scope.$watchCollection('route', function(newValue, oldValue) {
					calculateAndDisplayRoute(newValue);
				});

				scope.$watchCollection('markers', function(newValue, oldValue) {
					renderMarkers(newValue);
				});

				scope.$watchCollection('resize', function(newValue, oldValue) {
					if(newValue) {
						resizeMap(function() {
							setMapCenter(_map.getCenter());
						});
					}
				});

				scope.$watchCollection('info', function(newValue, oldValue) {
					if(newValue) {
						if(_infoWindow) _infoWindow.close();
						_infoWindow = new google.maps.InfoWindow(newValue);
						if(newValue.index && _markers.length > 0) {
							_infoWindow.open(_map, _markers[newValue.index]);
						}
						else if(newValue.marker) {
							_infoWindow.open(_map, addGenericMarker(marker));
						}
						else {
							_infoWindow.open(_map);
						}
					}
				});

				renderMap(attrs.id, scope.options, function(map) {
					_map = map;
					renderMarkers(scope.markers);
					_directionsService = new google.maps.DirectionsService;
  					_directionsDisplay = new google.maps.DirectionsRenderer;
				});
			}
		}
	});
})(angular.module('ngGoogleMaps'));