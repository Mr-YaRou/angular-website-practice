// conf.js
let HtmlReporter = require('protractor-beautiful-reporter');

exports.config = {
    framework: 'jasmine',
    directConnect: true,
    sharedTestFiles: true,
    specs: ['paitents-spec.js', 'admin-spec.js'],

    onPrepare: function () {
      
      jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: 'Reports/screenshots'
      }).getJasmine2Reporter());

    }
};

