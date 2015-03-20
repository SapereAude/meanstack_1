angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app')
	.config(function ($routeProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$routeProvider
			.when('/', {
				templateUrl: '/partials/main',
				controller: 'mainCtrl'
			})
			.when('/about', {
				templateUrl: '/partials/about',
				controller: 'aboutCtrl'
			});
	});

angular.module('app')
	.controller('mainCtrl', function ($scope) {
		$scope.myVar = "This is the main route page";
	})
	.controller('aboutCtrl', function ($scope) {
		$scope.myVar = "This is the angular route about page";
	});