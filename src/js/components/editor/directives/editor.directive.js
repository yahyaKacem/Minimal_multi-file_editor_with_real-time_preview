editorDirectives.editor = function() {
  var controller = function() {
    var AceEditor = require("ace/editor").Editor;
    var Renderer  = require("ace/virtual_renderer").VirtualRenderer;
    var Editor    = function() {
      this.controllers = [];
    };
    this.setCanvas = function(el) {
      return this.ace = new AceEditor(new Renderer(el, "ace/theme/textmate"));
    };
    this.attachBuffer = function(controller) {
      return this.controllers.push(controller);
    };
    return Editor;
  };
  var linker = function(iScope, iElement, iAttrs, ctrl) {
    $scope.$watch("session.active", function(active) {
      var controller;
      var _i;
      var _len;
      var _ref = ctrl.controllers;
      var _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        controller = _ref[_i];
        if (controller.buffer === active) {
          _results.push(ctrl.ace.setSession(controller.aceSession));
        }
      }
      return _results;
    });
    return $scope.$on("reflow", function() {
      return ctrl.ace.resize();
    });
  };
  return {
    restrict:   "E",
    replace:    true,
    require:    "editor",
    scope:      {session: "="},
    template:   "<div class=\"editor\">\n  <editor-buffer buffer=\"buffer\" ng-model=\"buffer.content\" ng-repeat=\"buffer in session.buffers\"></editor-buffer>\n  <editor-canvas></editor-canvas>\n</div>",
    controller: controller,
    link:       linker
  };
};
