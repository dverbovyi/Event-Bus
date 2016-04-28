/**
 * Created by Dmytro on 4/26/2016.
 */
module.exports = function (config) {
    config.set({
        frameworks: ['browserify', 'jasmine'],

        files: [
            './dist/*.js',
            './tests/*.js'
        ],

        preprocessors: {
            './tests/*.js': ['browserify'],
            './dist/*.js': ['coverage']
        },

        browserify: {
            debug: true,
            transform: [ ['babelify', {"presets": ["es2015"]}] ]
        },

        colors: true,
        logLevel: config.LOG_INFO,

        reporters: ['mocha', 'progress', 'coverage'],

        coverageReporter: {
          type : 'text-summary',
          dir : 'coverage/'
        },

        browsers: ['PhantomJS'],
        // browsers: ['Chrome'],

        autoWatch: false,
        singleRun: true
    });
};
