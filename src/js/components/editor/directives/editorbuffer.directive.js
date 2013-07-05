editorDirectives.editorBuffer = function($rootScope) {
  var controller = function() {
    var EditSession = require("ace/edit_session").EditSession;
    var UndoManager = require("ace/undomanager").UndoManager;
    var Range       = require("ace/range").Range;
    var EditorBuffer = function($scope) {
      var _this       = this;
      this.buffer     = $scope.buffer;
      this.aceSession = new EditSession(this.buffer.content || "");
      this.aceSession.setUndoManager(new UndoManager());
      this.aceSession.setTabSize(2);
      this.aceSession.setUseWorker(true);
      $scope.$watch("buffer.filename", function() {
        return _this.aceSession.setMode(_this.guessMode());
      });
    }
    this.syncWith = function($scope, model) {
      var session   = this.aceSession;
      model.$render = function() {
        return session.setValue(model.$modelValue);
      };
      var updateViewValue = function(value) {
        return model.$setViewValue(value);
      };
      session.on("change", function() {
        var value = session.getValue();
        if (model.$viewValue !== value) {
          if ($rootScope.$$phase) {
            return updateViewValue(value);
          } else {
            return $scope.$apply(function() {
              return updateViewValue(value);
            });
          }
        }
      });
      return $scope.$on("$destroy", function() {
        return editor.removeListener("change", updateViewValue);
      });
    };
    this.guessMode = function() {
      return "ace/mode/" + (/\.js$/.test(this.buffer.filename) ? "javascript" : /\.html$/.test(this.buffer.filename) ? "html" : /\.css$/.test(this.buffer.filename) ? "css" : "text");
    };
    return EditorBuffer;
  };
  var linker = function(iScope, iElement, iAttrs, ctrls){
    var editor = ctrls[0];
    var model  = ctrls[1];
    var buffer = ctrls[2];
    editor.attachBuffer(buffer);
    return buffer.syncWith($scope, model);
  };
  return {
    restrict:   "E",
    replace:    true,
    require:    ["^editor", "ngModel", "editorBuffer"],
    scope:      {buffer: "="},
    template:   "<div class=\"editor-buffer\"></div>",
    controller: controller,
    link:       linker
  };
};
