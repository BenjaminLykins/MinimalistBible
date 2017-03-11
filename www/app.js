var app = angular.module('Main-App', ['ngRoute', 'ngCookies', 'ui.select', 'ngSanitize']);

app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : 'pages/mainpage.html',
        })
        .when('/home', {
            templateUrl : 'pages/mainpage.html'
        })
        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
        })
        // route for the contact page
        .when('/read/:book', {
            templateUrl : 'pages/read.html',
        })
        .when('/read/:book/:chapter', {
            templateUrl : 'pages/read.html',
        })
        .otherwise({
          templateUrl: 'pages/errorpage.html'
        });

        $locationProvider.html5Mode(true);
});
