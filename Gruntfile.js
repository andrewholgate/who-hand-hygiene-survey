module.exports = function(grunt) {
    "use strict";

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
    grunt.loadNpmTasks("grunt-jscs");
    grunt.loadNpmTasks("grunt-casperjs");

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        sourcepath: "app/",
        buildpath: "dist/",
        modules: "node_modules/",
        clean: {
            build: {
                src: [ "<%= buildpath %>" ]
            }
        },
        copy: {
            build: {
                nonull: true,
                cwd: "<%= sourcepath %>",
                src: [
                    "favicon.ico",
                    "index.html",
                    "offline.appcache",
                    "robots.txt"
                ],
                dest: "<%= buildpath %>",
                expand: true
            },
            updatelibs: {
                flatten: true,
                expand: true,
                cwd: "<%= modules %>",
                src: [
                    "backbone/backbone.js",
                    "backbone/node_modules/underscore/underscore.js",
                    "backbone.localstorage/backbone.localstorage.js",
                    "jquery/dist/jquery.js",
                    "requirejs-text/text.js"
                ],
                dest: "<%= sourcepath %>libs/"
            }
        },
        cssmin: {
            build: {
                src: [
                    "<%= sourcepath %>css/bootstrap.css",
                    "<%= sourcepath %>css/custom.css"
                ],
                dest: "<%= buildpath %>css/styles.css"
            }
        },
        requirejs: {
            build: {
                options: {
                    baseUrl: "<%= sourcepath %>",
                    mainConfigFile: "<%= sourcepath %>app.js",
                    name: "app",
                    out: "<%= buildpath %>js/scripts.js",
                    optimize: "uglify2",
                    optimizeCss: "standard",
                    optimizeAllPluginResources: true,
                    inlineText: true,
                    stubModules: [ "text" ]
                }
            }
        },
        uglify: {
            build: {
                files: {
                    "<%= buildpath %>libs/require.min.js":
                        [ "<%= sourcepath %>libs/require.js" ]
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                bitwise: true,
                eqeqeq: true,
                es3: true,
                forin: true,
                freeze: true,
                futurehostile: true,
                iterator: true,
                latedef: "nofunc",
                maxcomplexity: 10,
                maxdepth: 3,
                nocomma: true,
                nonbsp: true,
                nonew: true,
                undef: true,
                unused: true,
                strict: true,
                browser: true,
                globals: {
                    "define": false
                },
            },
            build: {
                src: [ "<%= sourcepath %>js/**/*.js" ]
            }
        },
        htmlhint: {
            build: {
                options: {
                    "tag-pair": true,
                    "tagname-lowercase": true,
                    "attr-lowercase": true,
                    "attr-value-double-quotes": true,
                    "id-unique": true,
                    "head-script-disabled": true,
                    "style-disabled": true
                },
                src: [
                    "<%= sourcepath %>templates/*.html",
                    "<%= sourcepath %>index.html"
                ]
            }
        },
        jscs: {
            src: [
                "<%= sourcepath %>js/**/*.js",
                "test/**/*.js"
            ],
            options: {
                config: ".jscsrc"
            }
        },
        casperjs: {
            options: {
                async: {
                    parallel: true
                }
            },
            files: [ "test/casperjs/**/*.js "]
        },
        watch: {
            html: {
                files: [
                    "<%= sourcepath %>templates/*.html",
                    "<%= sourcepath %>index.html"
                ],
                tasks: [ "htmlhint", "requirejs" ]
            },
            css: {
                files: [ "<%= sourcepath %>css/*.css" ],
                tasks: [ "cssmin"]
            },
            js: {
                files: "<%= sourcepath %>js/**/*.js",
                tasks: [ "jscs", "requirejs" ]
            },
            copy: {
                files: [ "<%= sourcepath %>**" ],
                tasks: [ "copy:build" ]
            }
        },
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: "<%= buildpath %>",
                    hostname: "*"
                }
            }
        },
    });

    grunt.registerTask(
        "build",
        "Build a distrubution version of the project.",
        [ "clean:build", "uglify:build", "copy:build", "cssmin:build", "requirejs:build" ]
    );

    grunt.registerTask(
        "default",
        "Watches for project changes, automatically builds and runs server.",
        [ "build", "connect", "watch" ]
    );

    grunt.registerTask(
        "test",
        "Run project test suites.",
        [ "jshint", "htmlhint", "jscs", "connect", "casperjs" ]
    );
};
