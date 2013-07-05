app.factory('Files', ['$http', function($http){
  var Url   = "json_files/files.json";
  var Files = $http.get(Url).then(function(response){
     return response.data;
  });
  return Files;
}]);
