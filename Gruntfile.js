module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            options: {
                port: 9000,
                hostname: 'localhost', //默认就是这个值，可配置为本机某个 IP，localhost 或域名
                livereload: 35729  //声明给 watch 监听的端口
            },

            server: {
                options: {
                    open: true, //自动打开网页 http://
                    base: [
                        'build/'  //主目录
                    ]
                }
            }
        },

        watch: {
            livereload: {
                options: {
                    livereload: '<%=connect.options.livereload%>'  //监听前面声明的端口  35729
                },

                files: [  //下面文件的改变就会实时刷新网页
                    'build/*.html',
                    'build/css/{,*/}*.css',
                    'build/scripts/browserify/{,*/}*.js',
                    'build/images/{,*/}*.{png,jpg}'
                ]
            },

            styles: {
                files: ['less/custom/*.less'],
                tasks: ['less','cssmin']
            },

            react: {
                files: ['react/**/*.jsx','actions/*.js','stores/**/*.js'],
                tasks: ['browserify','uglify']
            }
        },

        less: {
            development: {
                options: {
                    compress: false,
                    yuicompress: false
                },
                files: {
                    "css/app.css": "less/custom/app.less",
                }
            }
            //,
            //production: {
            //    options: {
            //        compress: true,
            //        yuicompress: true
            //    },
            //    files: {
            //        "build/css/app.css": "less/custom/app.less",
            //    }
            //}
        },

        browserify: {
            options: {
                transform: [ require('grunt-react').browserify ]
            },
            client: {
                src: ['react/App.jsx'],
                dest: 'js/bundle.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.file %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },

            build: {
                files: {
                    'build/scripts/browserify/bundle.min.js': ['js/bundle.js']
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: './css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'build/css',
                    ext: '.min.css'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    grunt.registerTask('default', [
        'less','cssmin',
        'browserify','uglify',
        'connect:server',
        'watch'
    ]);
};