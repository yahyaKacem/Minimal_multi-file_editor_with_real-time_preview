controllers.MainCtrl = function($scope, session, Files) {
  Files.then(function(data){
    files = data;
    $scope.session = session;
    session.reset({files: files});
    console.log(files);
  });
  return $scope.addFile = function() {
    var filename;
    if (filename = prompt("Filename?")) {
      return session.addBuffer(filename);
    }
  };
};
