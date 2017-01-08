var app = angular.module('Main-App', ['ngRoute', 'ngCookies', 'ui.select', 'ngSanitize']);

app.config(function($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
            templateUrl : 'pages/mainpage.html',
            controller  : 'Main-Controller'
        })
        .when('/home', {
            templateUrl : 'pages/mainpage.html',
            controller  : 'Main-Controller'
        })
        // route for the about page
        .when('/about', {
            templateUrl : 'pages/about.html',
            controller  : 'About-Controller'
        })
        // route for the contact page
        .when('/read/:book', {
            templateUrl : 'pages/read.html',
            controller  : 'Read-Controller'
        })
        .when('/read/:book/:chapter', {
            templateUrl : 'pages/read.html',
            controller  : 'Read-Controller'
        })
        .otherwise({
          templateUrl: 'pages/errorpage.html'
        });
});
