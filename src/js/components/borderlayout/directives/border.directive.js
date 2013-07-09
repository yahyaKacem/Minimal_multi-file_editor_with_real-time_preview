borderLayoutDirectives.border = function(){
  var linker = function($scope, $el, attrs, ctrls){
    var border = ctrls[0];
    var layout = ctrls[1];
    return layout.setBorder($scope.anchor, border);
  };
  var controller = function($scope, $element){
    $scope.style        = {};
    this.scope          = $scope;
    this.element        = $element[0];
    this.getElementSize = function(){
      var _ref = this.scope.anchor;
      if(_ref === "north" || _ref === "south"){
        return this.element.offsetHeight;
      } else if(_ref === "west" || _ref === "east"){
        return this.element.offsetWidth;
      } else{
        throw new Error("Unsupported anchor: " + _ref);
      }
    };
    this.setSize = function(size, style){
      var _ref = this.scope.anchor;
      if(style == null){
        style ={};
      }
      this.scope.size = size;
      if(_ref === "north" || _ref === "south"){
        style.height = "" + size + "px";
      } else if(_ref === "west" || _ref === "east"){
        style.width = "" + size + "px";
      } else{
        throw new Error("Unsupported anchor: " + _ref);
      }
      angular.copy(style, this.scope.style);
      return size;
    };
    var calculateSize = function(target, total){
      var matches;
      target || (target = 0);
      if(angular.isNumber(target)){
        if(target >= 1){
          return Math.round(target);
        }
        if(target >= 0){
          return Math.round(target * total);
        }
        return 0;
      }
      if(matches = target.match(/^(\d+)px$/)){
        return parseInt(matches[1], 10);
      }
      if(matches = target.match(/^(\d+)%$/)){
        return Math.round(total * parseInt(matches[1], 10) / 100);
      }
      throw new Error("Unsupported size: " + target);
    };
    this.calculateSize = function(avail, total, style){
      var size;
      if(style == null){
        style ={};
      }
      var target = this.scope.size || this.scope.target || this.getElementSize() || 0;
      var max    = this.scope.max || Number.MAX_VALUE;
      var min    = this.scope.min || 0;
      size       = calculateSize(target, total);
      size       = Math.min(size, calculateSize(max, total));
      size       = Math.max(size, calculateSize(min, total));
      size       = Math.min(size, avail);
      return this.setSize(size, style);
    };
    return this;
  };
  return{
    restrict:    "E",
    replace:     true,
    require:     ["border", "^borderLayout"],
    transclude:  true,
    template:    "<div class=\"pane{{anchor}}\" ng-class=\"{moving: moving, constrained: constrained}\" ng-style=\"style\" ng-transclude>\n  <div class=\"overlay\"></div>\n</div>",
    controller:  controller,
    link:        linker,
    scope:{
      anchor: "@",
      target: "@",
      min: "@",
      max: "@"
    }
  };
};
