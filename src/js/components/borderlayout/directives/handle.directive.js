borderLayoutDirectives.handle = function($window) {
  var linker = function(iScope, iElement, iAttrs, ctrls) {
    var border  = ctrls[0];
    var layout  = ctrls[1];
    var __slice = [].slice;
    var throttle = function(delay, fn) {
      var throttled = false;
      return function() {
        if (throttled) {
          return;
        }
        throttled = true;
        setTimeout((function() {
          return throttled = false;
        }), delay);
        return fn.call.apply(fn, [this].concat(__slice.call(arguments)));
      };
    };
    iScope.trackMove = function($event) {
      var _ref = border.scope.anchor;
      $event.preventDefault();
      if (_ref === "north" || _ref === "south") {
        var coord = "y";
      } else if (_ref === "west" || _ref === "east") {
        var coord = "x";
      }
      if (_ref === "north" || _ref === "west") {
        var scale = 1;
      } else if (_ref === "south" || _ref === "east") {
        var scale = -1;
      }
      var initialCoord = $event[coord];
      var initialSize  = border.scope.size;
      var element      = iElement[0];
      var mouseMove    = throttle(10, function(e) {
        e.preventDefault();
        if (typeof element.setCapture === "function") {
          element.setCapture();
        }
        return iScope.$apply(function() {
          var targetSize = initialSize + scale * (e[coord] - initialCoord);
          border.scope.size = targetSize;
          layout.reflow();
          iScope.constrained = border.scope.constrained = targetSize !== border.scope.size;
          return iScope.moving = border.scope.moving = true;
        });
      });
      var mouseUp = function(e) {
        e.preventDefault();
        iScope.$apply(function() {
          iScope.constrained = border.scope.constrained = false;
          return iScope.moving = border.scope.moving = false;
        });
        $window.removeEventListener("mousemove", mouseMove, true);
        $window.removeEventListener("mouseup", mouseUp, true);
        return typeof element.releaseCapture === "function" ? element.releaseCapture() : void 0;
      };
      element.unselectable = "on";
      element.onselectstart = function() {
        return false;
      };
      element.style.userSelect = element.style.MozUserSelect = "none";
      $window.addEventListener("mousemove", mouseMove, true);
      return $window.addEventListener("mouseup", mouseUp, true);
    };
    return iScope.trackMove;
  }
  return {
    restrict:   "E",
    replace:    true,
    require:    ["^border", "^borderLayout"],
    transclude: true,
    template:   "<div class=\"handle\" ng-class=\"{moving: moving, constrained: constrained}\" ng-mousedown=\"trackMove($event)\" ng-transclude>\n</div>",
    link:       linker
  };
};
