borderLayoutDirectives.center = function() {
  var Center;
  // need to add the $scope injection to this controller
  var controller = function($scope) {
    var Center = function($scope) {
      this.scope = $scope;
    };
    this.setRect = function(rect) {
      return this.scope.style = {
        left: "" + (rect.left || 0) + "px",
        top: "" + (rect.top || 0) + "px",
        right: "" + (rect.right || 0) + "px",
        bottom: "" + (rect.bottom || 0) + "px"
      };
    };
    return Center;
  };
  var linker = function(iScope, iElement, iAttrs, ctrls) {
    var center;
    var layout;
    var center = ctrls[0];
    var layout = ctrls[1];
    return layout.setCenter(center);
  };
  return {
    restrict: "E",
    replace: true,
    require: ["center", "^borderLayout"],
    transclude: true,
    template: "<div class=\"pane center\" ng-style=\"style\" ng-transclude>\n</div>",
    controller: controller,
    link: linker
  };
};
