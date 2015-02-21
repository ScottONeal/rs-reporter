var app = angular.module("rsReporter", ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'static/templates/dashboard.html',
      controller: 'dashboardCtrl'
    })
    .when('/config', {
      templateUrl: 'static/templates/config.html',
      controller: 'configCtrl'
    })
    .when('/about', {
      templateUrl: 'static/templates/about.html',
      controller: 'aboutCtrl'
    })
    .when('/projects/:projectId', {
      templateUrl: 'static/templates/project.html',
      controller: 'projectCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);

}]);

app.controller("dashboardCtrl", function($scope, $http) {
  $http.get('/api/projects')
    .then(function(res) {
      $scope.projects = res.data;
    });
});

app.controller("configCtrl", function($scope, $http) {
  $http.get('/api/config')
    .then(function(res) {
      $scope.config = res.data;
    });
});

app.controller("aboutCtrl", function($scope, $http) {
  $http.get('/api/about')
    .then(function(res) {
      $scope.package = res.data;
    });
});

app.controller("navigationCtrl", function($scope, $rootScope, $location) {
  $rootScope.$on('$locationChangeSuccess', function() {
    $scope.active = $location.path();
  });
});
