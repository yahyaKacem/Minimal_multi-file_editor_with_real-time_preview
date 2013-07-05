/*global module:false*/
module.exports = function(grunt) {
  /**
   * Load required Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */
  // load all grunt tasks with matchdep
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  /**
   * This is the configuration object Grunt uses to give each plugin its
   * instructions.
   */
  grunt.initConfig({
    // Metadata.
    /**
     * We read in our `package.json` file so we can access the package name and
     * version. It's already there, so we don't repeat ourselves here.
     */
    jsFiles: "src/js/",
    scssFiles: "src/scss/",
    libsFiles: "src/libs/",
    tempFiles: "src/.tmp/",
    componentsFiles: "src/js/components/",
    pkg: grunt.file.readJSON('package.json'),
    /**
     * The directory to which we throw our compiled project files.
     */
    /**
     * The banner is the comment that is placed at the top of our compiled
     * source files. It is first processed as a Grunt template, where the `<%=`
     * pairs are evaluated based on this very configuration object.
     */
    banner: grunt.template.process(
      grunt.file.read('grunt/templates/banner.template.js'),
      {
        data: {
          "pkg": grunt.file.readJSON('package.json')
        }
      }
    ),
    // Task configuration.
    /**
     * `grunt concat` concatenates multiple source files into a single file.
     */
    concat: {
      options: {
        banner: '<%=banner%>',
        separator: ""
      },
      libs: {
        files: {
          '<%=tempFiles%>js/libs.js': [
            '<%=libsFiles%>angular-unstable/angular.js',
            '<%=libsFiles%>angular-bootstrap/ui-bootstrap-tpls.min.js',
            '<%=libsFiles%>angular-ui-router/release/angular-ui-router.min.js'
          ]
        }
      },
      main: {
        files: {
          '<%=tempFiles%>js/main.js': [
            "<%=jsFiles%>main.vars.js",
            "<%=jsFiles%>main.controller.js",
            "<%=jsFiles%>main.app.js",
            "<%=jsFiles%>services/files.service.js"
          ]
        }
      },
      components: {
        files: {
          '<%=tempFiles%>js/components.js': [
            // filer component files
            '<%=componentsFiles%>filer/filer.js',
            // editor component files
            '<%=componentsFiles%>editor/editor.vars.js',
            '<%=componentsFiles%>editor/directives/editorbuffer.directive.js',
            '<%=componentsFiles%>editor/directives/editorcanvas.directive.js',
            '<%=componentsFiles%>editor/directives/editor.directive.js',
            '<%=componentsFiles%>editor/editor.app.js',
            // borderlayout component files
            '<%=componentsFiles%>borderlayout/borderlayout.vars.js',
            '<%=componentsFiles%>borderlayout/directives/borderlayout.directive.js',
            '<%=componentsFiles%>borderlayout/directives/border.directive.js',
            '<%=componentsFiles%>borderlayout/directives/center.directive.js',
            '<%=componentsFiles%>borderlayout/directives/handle.directive.js',
            '<%=componentsFiles%>borderlayout/borderlayout.app.js',
            // previwer component files
            '<%=componentsFiles%>previewer/previewer.vars.js',
            '<%=componentsFiles%>previewer/directives/previewer.directive.js',
            '<%=componentsFiles%>previewer/previewer.app.js',
            '<%=componentsFiles%>previewer/services/types.service.js',
            // session component files
            '<%=componentsFiles%>session/session.app.js',
            '<%=componentsFiles%>session/services/session.service.js'
          ]
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    compass: {
      dev: {
        options: {
          sassDir: 'src/scss',
          cssDir: '<%=tempFiles%>/css'
        }
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['default']
      },
      libs: {
        files: ["<%=libsFiles%>**/*js"],
        tasks: ['concat:libs']
      },
      main: {
        files: ["<%=jsFiles%>*.js", "<%=jsFiles%>services/*.js"],
        tasks: ['concat:main']
      },
      components: {
        files: ['<%=jsFiles%>components/**/*js'],
        tasks: ['concat:components']
      },
      compass: {
        files: ['<%=scssFiles%>**/*.scss'],
        tasks: ['compass']
      }
      // lib_test: {
      //   files: '<%= jshint.lib_test.src %>',
      //   tasks: ['jshint:lib_test', 'qunit']
      // }
    }
  });
  // Default task.
  grunt.registerTask('default', ['compass', 'concat']);
};
