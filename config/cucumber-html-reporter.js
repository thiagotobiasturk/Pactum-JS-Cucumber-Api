const reporter = require('cucumber-html-reporter');

const options = {
  theme: 'bootstrap',
  jsonFile: './reports/cucumber_report.json',
  output: './reports/cucumber_report.html',
  reportSuiteAsScenarios: true,
  launchReport: true,
  metadata: {
    "appVersion": "0.0.1",
    "user": "User",
    "time": new Date()
  }
};

reporter.generate(options);
