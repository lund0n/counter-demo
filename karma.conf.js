const webpackEnv = { test: true };
const webpackConfig = require('./webpack.config')(webpackEnv);

process.env.BABEL_ENV = 'test'; // so we load the correct babel plugins
module.exports = function setKarmaConfig(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: ['src/**/*.test.js'],
    preprocessors: {
      'src/**/*.test.js': ['webpack'],
    },
    webpack: webpackConfig,
    webpackMiddleware: { noInfo: true },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
  });
};
