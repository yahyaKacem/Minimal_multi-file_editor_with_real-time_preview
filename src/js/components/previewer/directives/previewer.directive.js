previewerDirectives.previewer = function($q, $rootScope, types) {
  var linker = function($scope, $el, attrs) {
    var withFiler;
    withFiler = (function() {
      var dfd, filer;
      dfd = $q.defer();
      filer = new Filer;
      filer.init({
        persistent: false,
        size: 1024 * 1024
      }, function(fs) {
        return $rootScope.$apply(function() {
          if (fs) {
            return dfd.resolve(filer);
          } else {
            return dfd.reject("Failed to create filesystem");
          }
        });
      });
      return function(cb) {
        return dfd.promise.then(cb);
      };
    })();
    return $scope.$watch("session.buffers", function(buffers) {
      return withFiler(function(filer) {
        var buffer, index, promises, _fn, _i, _len;
        promises = [];
        index = null;
        _fn = function(buffer) {
          var dfd;
          dfd = $q.defer();
          filer.write(buffer.filename, {
            data: buffer.content,
            type: types.getByFilename(buffer.filename).mime,
            append: false
          }, function(entry) {
            return $scope.$apply(function() {
              if (buffer.filename === "index.html") {
                index = entry;
              }
              return dfd.resolve();
            });
          });
          return promises.push(dfd.promise);
        };
        for (_i = 0, _len = buffers.length; _i < _len; _i++) {
          buffer = buffers[_i];
          _fn(buffer);
        }
        return $q.all(promises).then(function() {
          $el.attr("src", index ? index.toURL() : "about:blank");
          return $scope.$broadcast("refresh");
        });
      });
    }, true);
  };
  return {
    restrict: "E",
    replace:  true,
    link:     linker,
    scope:    {session: "="},
    template: "<iframe src=\"about:blank\" width=\"100%\" height=\"400px\" frameborder=\"0\"></iframe>"
  };
};
