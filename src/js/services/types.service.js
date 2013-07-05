previewer.factory("types", function() {
  var name, type, types;
  types = {
    css: {regex: /\.css$/i, mime: "text/css"},
    text: {regex: /\.txt$/, mime: "text/plain"},
    html: {regex: /\.html$/i, mime: "text/html"},
    javascript: {regex: /\.js$/i, mime: "text/javascript"}
  };
  for(name in types) {
    type       = types[name];
    types.name = name;
  }
  return {
    types: types,
    getByFilename: function(filename) {
      var mode, _ref;
      _ref = this.types;
      for (name in _ref) {
        mode = _ref[name];
        if (mode.regex.test(filename)) {
          return mode;
        }
      }
      return this.types.text;
    }
  };
});
