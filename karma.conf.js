var path = require('path');

var webpackConfig = require('./webpack.config');

var ENV = process.env.npm_lifecycle_event;
var isTestWatch = ENV === 'test-watch';

module.exports = function(config) {
    var _config = {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // test frameworks, i.e mocha, jasmine, etc.
        frameworks: ['jasmine'],

        // pattern config
        files: [
            { pattern: './karma-shim.js', watched: false }
        ],

        exclude: [],
        // See https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './karma-shim.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: 'errors-only'
        },
        webpackServer: {
            noInfo: true
        },
        // See https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["mocha"],
        port: 9876,
        colors: true,
        // Debugging verbosity
        logLevel: config.LOG_INFO,
        // enable / disable watcher
        autoWatch: false,
        // See https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],
        // Continious integration mode. watch files for changes, run tests and exists.
        singleRun: true
    };

    if (!isTestWatch) {
        _config.reporters.push("coverage");
        _config.coverageReporter = {
            dir: 'coverage/',
            reporters: [{
                type: 'json',
                dir: 'coverage',
                subdir: 'json',
                file: 'coverage-final.json'
            }]
        };
    }
    config.set(_config);
};