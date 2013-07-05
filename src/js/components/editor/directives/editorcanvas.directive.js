editorDirectives.editorCanvas = function() {
  return {
    restrict: "E",
    replace: true,
    require: "^editor",
    template: "<div class=\"editor-canvas\"></div>",
    link: function(iScope, iElement, iAttrs, editor) {
      return editor.setCanvas(iElement[0]);
    }
  };
};
