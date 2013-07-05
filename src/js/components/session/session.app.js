var Session, module;
sessionApp = angular.module("ped.session", []);
module.service("session", Session = (function() {
  var Buffer;

  Buffer = (function() {
    function Buffer(filename, content) {
      this.filename = filename;
      this.content = content != null ? content : "";
    }

    Buffer.prototype.rename = function(filename) {
      this.filename = filename;
      return this;
    };

    return Buffer;

  })();

  function Session() {
    this.active = new Buffer("index.html");
    this.buffers = [this.active];
  }

  Session.prototype.reset = function(json) {
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

  Session.prototype.getBufferByFilename = function(filename) {
    var buffer, _i, _len, _ref;

    _ref = this.buffers;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      buffer = _ref[_i];
      if (buffer.filename === filename) {
        return buffer;
      }
    }
  };

  Session.prototype.add = function(filename, content) {
    var buffer;

    if (content == null) {
      content = "";
    }
    filename || (filename = prompt("Filename?"));
    if (!filename) {
      throw new Error("Invalid filename");
    }
    if (buffer = this.getBufferByFilename(filename)) {
      throw new Error("Buffer already exists");
    }
    this.buffers.push(new Buffer(filename, content));
    return this;
  };

  Session.prototype.remove = function(filename) {
    var buffer;

    if (!filename) {
      throw new Error("Invalid filename");
    }
    if (!(buffer = this.getBufferByFilename(filename))) {
      throw new Error("Buffer does not exist");
    }
    this.buffers.splice(this.buffers.indexOf(buffer), 1);
    return this;
  };

  return Session;

})());
