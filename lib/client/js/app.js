var app = angular.module("rsReporter", []);

app.controller("projectsCtrl", function($scope) {
  var projects = [
    { name: "Project One", status: "Failed", description: "Failed RS Check"},
    { name: "Project Two", status: "Passed", description: "All is well Well!"}
  ];

  $scope.projects = projects;

  //$http.get('/projects')
  //  .then(function(projects) {
  //    $scope.projects = projects;
  //  });
});
