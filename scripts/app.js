'use strict';

angular.module('EmaServerMarksApp', ['ui.bootstrap'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/servermarks.html',
        controller: 'EntryController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
