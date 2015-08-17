module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			scripts: {
				files: ['src/js/**/*.js'],
				tasks: ['browserify', 'uglify:development'],
			},
			css: {
				files: 'src/css/**/*.less',
				tasks: ['less:development']
			},
		},
		browserify: {
			options: {},
			'src/compiled.js': ['src/js/client.js']
		},
		uglify: {
			development: {
				options: {
					mangle: false,
					compress: false,
				},
				files: {
					'build/compiled.js': ['src/compiled.js']
				},
			},
			compressed: {
				options: {
					mangle: true,
					compress: {
						//TODO: Optimize using compressor options (https://github.com/mishoo/UglifyJS2#compressor-options)
					}
				},
				files: {
					'build/compiled.js': ['src/compiled.js']
				},
			}
		},
		less: {
			development: {
				files: {
					"build/style.css": "src/css/**/*.less"
				}
			},
			compressed: {
				files: {
					"build/style.css": "src/css/**/*.less"
				},
				compress: true,
			}
		},
		htmlmin: {
			development: {
				files: {
					'build/index.html': 'src/index.html'
				}
			},
			compressed: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
				},
				files: {
					'build/index.html': 'src/index.html'
				}
			}
		},
		copy: {
			development: {
				files: [{
					expand: false,
					src: ['src/img'],
					dest: 'build/img',
				}]
			},
			compressed: {
				files: [{
					expand: false,
					src: ['src/img'],
					dest: 'build/img',
				}]
			}
		},
		compress: {
			main: {
				options: {
					archive: 'build/game.zip',
					mode: 'zip'
				},
				files: [{
					expand: true,
					flatten: true,
					cwd: './',
					src: ['build/*.css', 'build/*.js', 'build/*.html'],
					dest: './'
				}]
			}
		},
	});

	var fs = require('fs');
	grunt.registerTask('sizecheck', function() {
		var done = this.async();
		fs.stat('build/game.zip', function(err, zip) {
			if (zip.size > 13312) {
				//If size in bytes greater than 13kb
				grunt.log.error("Zipped file greater than 13kb \x07 \n");
				grunt.log.error("Zip is " + zip.size + " bytes when js13k max is 13,312 bytes");
			}
			done();
		});
	});

	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-compress');


	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['browserify', 'uglify:development', 'less:development', 'htmlmin:development', 'copy:development']);
	grunt.registerTask('build-compress', ['browserify', 'uglify:compressed', 'less:compressed', 'htmlmin:compressed', 'copy:compressed', 'compress:main', 'sizecheck']);

};