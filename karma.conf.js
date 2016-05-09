/**
 * Created by Dmytro on 4/26/2016.
 */
var istanbul = require('browserify-istanbul');
var isparta = require('isparta');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['browserify', 'jasmine'],

        files: [
            './src/*.js',
            './tests/*.js'
        ],

        preprocessors: {
            './src/*.js': ['browserify'],
            './tests/*.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: [
                ['babelify', {"presets": ["es2015"]}],
                [istanbul({instrumenter: isparta})]
            ]
        },

        colors: true,
        logLevel: config.LOG_INFO,

        reporters: ['mocha', 'progress', 'coverage'],

        coverageReporter: {
            instrumenters: {isparta: isparta},
            instrumenter: {'**/*.js': 'isparta'},
            reporters: [{
                type: 'lcov',
                dir: 'coverage/'
            }, {
                type: 'text-summary'
            }]
        },

        browsers: ['PhantomJS'],
        // browsers: ['Chrome'],

        autoWatch: false,
        singleRun: true
    });
};
