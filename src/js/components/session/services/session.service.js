sessionApp.service("session", function(){
  var Buffer = function(filename, content){
    this.filename = filename;
    this.content  = content != null ? content : "";
    this.rename   = function(filename) {
      this.filename = filename;
      return this;
    };
    return this;
  };
  this.active = new Buffer("index.html");
  this.buffers = [this.active];
  this.reset = function(json) {
    var file, _i, _len, _ref;
    if (json == null) {
      json = {};
    }
    this.buffers.length = 0;
    _ref = json.files;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      file = _ref[_i];
      this.buffers.push(new Buffer(file.filename, file.content));
    }
    if (!this.buffers.length) {
      this.buffers.push(new Buffer("index.html"));
    }
    if (!(this.active = this.getBufferByFilename("index.html"))) {
      return this.active = this.buffers[0];
    }
  };
  this.getBufferByFilename = function(filename) {
    var buffer, _i;
    var _ref = this.buffers;
    var _len  = _ref.length;
    for (_i = 0, _len; _i < _len; _i++) {
      buffer = _ref[_i];
      if (buffer.filename === filename) {
        return buffer;
      }
    }
  };
  this.add = function(filename, content) {
    if (content == null) {
      content = "";
    }
    filename || (filename = prompt("Filename?"));
    if (!filename) {
      throw new Error("Invalid filename");
    }
    var buffer = this.getBufferByFilename(filename)
    if (buffer) {
      throw new Error("Buffer already exists");
    }
    this.buffers.push(new Buffer(filename, content));
    return this;
  };
  this.remove = function(filename) {
    if (!filename) {
      throw new Error("Invalid filename");
    }
    var buffer = this.getBufferByFilename(filename);
    if (!buffer) {
      throw new Error("Buffer does not exist");
    }
    this.buffers.splice(this.buffers.indexOf(buffer), 1);
    return this;
  };
  return this;
});
