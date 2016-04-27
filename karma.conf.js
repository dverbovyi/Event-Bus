/**
 * Created by Dmytro on 4/26/2016.
 */
module.exports = function (config) {
    config.set({
        frameworks: ['browserify', 'jasmine'],

        files: [
            './dist/eventDriver.js',
            './tests/**/*.js'
        ],

        preprocessors: {
            './tests/**/*.js': ['browserify']
        },

        browserify: {
            debug: true,
            transform: [ ['babelify', {"presets": ["es2015"]}] ]
        },

        // port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,

        reporters: ['mocha'],

        browsers: ['PhantomJS'],
        // browsers: ['Chrome']

        autoWatch: false,
        singleRun: true
    });
};
