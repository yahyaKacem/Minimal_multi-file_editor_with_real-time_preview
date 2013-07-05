borderLayoutDirectives.borderLayout = function($window) {
  var controller  = function() {
    var BorderLayout = function($scope, $element) {
      this.handleSize = 8;
      this.element    = $element[0];
      this.scope      = $scope;
    };
    this.setCenter = function(center) {
      if (this.center) {
        throw new Error("Center already assigned");
      }
      this.center = center;
      return this;
    };
    this.setBorder = function(border, pane) {
      if (this[border]) {
        throw new Error("Border already assigned: " + border);
      }
      this[border] = pane;
      return this;
    };
    this.reflow = function() {
      var width  = this.element.offsetWidth;
      var height = this.element.offsetHeight;
      var rect   = {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
      };
      if(this.north) {
        rect.top += this.north.calculateSize(height - rect.top - rect.bottom, height);
      }
      if(this.south) {
        rect.bottom += this.south.calculateSize(height - rect.top - rect.bottom, height);
      }
      if(this.west) {
        rect.left += this.west.calculateSize(width - rect.left - rect.right, width, {
          top: "" + rect.top + "px",
          bottom: "" + rect.bottom + "px"
        });
      }
      if(this.east) {
        rect.right += this.east.calculateSize(width - rect.left - rect.right, width, {
          top: "" + rect.top + "px",
          bottom: "" + rect.bottom + "px"
        });
      }
      this.center.setRect(rect);
      return this.scope.$broadcast("reflow");
    };
    return BorderLayout;
  };
  var linker      = function($scope, $el, attr, ctrl) {
    ctrl.reflow();
    return $window.addEventListener("resize", function() {
      return $scope.$apply(ctrl.reflow.bind(ctrl));
    });
  };
  return {
    restrict: "E",
    replace: true,
    require: "borderLayout",
    transclude: true,
    template: "<div class=\"border-layout\" ng-transclude>\n</div>",
    controller: controller,
    link: linker
  };
};
