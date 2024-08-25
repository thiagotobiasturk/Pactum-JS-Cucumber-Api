module.exports = {
  default: `--format json:./reports/cucumber_report.json --require src/support/hooks.js  --require src/steps/*.js src/features/*.feature --format-options '{"colorsEnabled":true}' `
};
