'use strict';
module.exports = function (grunt) {

  // Carrega as tarefas do grunt automaticamente
  require('load-grunt-tasks')(grunt);

  // Tempo de cada tarefa
  require('time-grunt')(grunt);

  // paths
  var appConfig = {
    dist: 'dist'
  };

  // Configurações de todas as tarefas
  grunt.initConfig({

    // Verifica mudanças nos arquivos
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      karma: {
        files: ['<%= yeoman.app %>/{,*/}*.js', '<%= yeoman.sense.unitTest %>/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      protractor: {
	    files: ['<%= yeoman.sense.e2eTest %>/{,*/}*.js'],
	    tasks: ['protractor:continuous']
	  },
      less: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.less'],
        tasks: ['less:development', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/**/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 3000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost', //localhost
        livereload: 35739
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/styles/',
          src: '{,*/}*.css',
          dest: '<%= yeoman.dist %>/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles'
        ]
      }
    },

    less: {
      development: {
        options: {
          paths: ['<%= yeoman.app %>/styles'],
          concat: true
        },
        files: [{
            expand: true,
            cwd:    '<%= yeoman.app %>/styles',
            src:    'app.less',
            ext:    '.css',
            dest:   '.tmp/styles/'
        }]
      },
      production: {
        options: {
          paths: ['<%= yeoman.app %>/styles'],
          compress: true
        },
        files: [{
            expand: true,
            cwd:    '<%= yeoman.app %>/styles',
            src:    'app.less',
            ext:    '.css',
            dest:   '<%= yeoman.dist %>/styles/'
        }]
      }
    },

    // The following *-min tasks will produce minified files in the dist folder
    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/app.css': [
            '<%= yeoman.dist %>/styles/app.css'
          ]
        }
      }
    },
    uglify: {
      dist: {
        files: {
          '<%= yeoman.dist %>/app.js': [
            '<%= yeoman.dist %>/app.js'
          ]
        }
      }
    },
    concat: {
      dist: {
        src: ['app/app.js','app/components/**/*.js'],
        dest: '<%= yeoman.dist %>/app.js'
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>/',
          src: ['*.js', '!oldieshim.js'],
          dest: '<%= yeoman.dist %>/'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      options: {
        cdn: require('google-cdn-data')
      },
      dist: {
        html: ['<%= yeoman.dist %>/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*',
            'translate/*',
            'components/**/*.html',
            'styles/fonts.css',
            'images/*',
            'images/sense/**',
            'images/graph_icons_limits/**',
            'components/nvd3/nv.d3.js',
            'fonts/**/*'
          ],
          dest: '<%= yeoman.dist %>',
        }, {
          expand: true,
          cwd: 'bower_components/bootstrap/dist/',
          src: 'fonts/*',
          dest: '<%= yeoman.dist %>'
        }, {
          expand: true,
          cwd: '',
          src: 'bower_components/**',
          dest: '<%= yeoman.dist %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    processhtml: {
      dist: {
        files: {
          '<%= yeoman.dist %>/index.html': ['<%= yeoman.dist %>/index.html']
        }
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'less:development'
      ],
      test: [
        'less:development'
      ],
      dist: [
        'less:production',
        // 'imagemin',
        'svgmin'
      ]
    },

    // Test settings
    karma: {
      unit: {
        configFile: '<%= yeoman.sense.test %>/karma.conf.js',
        singleRun: true
      }
    },

    ngconstant: {
      // Options for all targets
      options: {
        space: '  ',
        wrap: '\'use strict\';\n\n {%= __ngModule %}',
        name: 'config',
      },
      // Environment targets
      development: {
        options: {
          dest: '<%= yeoman.app %>/config.js'
        },
        constants: {
          ENV: {
            name: 'development',
            version: '<%= yeoman.sense.version %>',
            senseProviderURL: '<%= yeoman.sense.senseProviderDev %>',
            senseMasterToken: '<%= yeoman.sense.senseMasterToken %>',
            senseBaaS:'<%= yeoman.sense.senseBaaS %>',
            senseAPI:'<%= yeoman.sense.senseAPI %>'
          }
        }
      },
      production: {
        options: {
          dest: '<%= yeoman.dist %>/config.js'
        },
        constants: {
          ENV: {
            name: 'development',
            version: '<%= yeoman.sense.version %>',
            senseProviderURL: '<%= yeoman.sense.senseProviderDev %>',
            senseMasterToken: '<%= yeoman.sense.senseMasterToken %>',
            senseBaaS:'<%= yeoman.sense.senseBaaS %>',
            senseAPI:'<%= yeoman.sense.senseAPI %>'
          }
        }
      }
    },

    protractor: {
    	  options: {
    	    // Location of your protractor config file
    	    configFile: '<%= yeoman.sense.test %>/protractor.conf.js',

    	    // Do you want the output to use fun colors?
    	    noColor: true,

    	    // Set to true if you would like to use the Protractor command line debugging tool
    	    // debug: true,

    	    // Additional arguments that are passed to the webdriver command
    	    args: { }
    	  },
    	  e2e: {
    	    options: {
    	      // Stops Grunt process if a test fails
    	      keepAlive: false
    	    }
    	  },
    	  continuous: {
    	    options: {
    	      keepAlive: true
    	    }
    	  }
    	}

  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'ngconstant:development',
      'wiredep:app',
      'concurrent:server',
      'autoprefixer',
      //'test',
      'connect:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('defaultTasksTest', [
	'clean:server',
	'ngconstant:development',
	'wiredep:test',
	'concurrent:test',
	'autoprefixer',
	'connect:test'
  ]);

  grunt.registerTask('e2e-test', [
    'defaultTasksTest',
    'protractor:e2e'
  ]);

  grunt.registerTask('unit-test', [
	'defaultTasksTest',
    'karma'
  ]);

  grunt.registerTask('test', [
	'defaultTasksTest',
    'karma',
    'protractor:e2e'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'ngconstant:production',
    'wiredep',
    'less:production',
    'svgmin',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'autoprefixer',
    'uglify',
    'processhtml',
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ]);
};
