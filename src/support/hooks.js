const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');
const { request, settings } = require('pactum');

setDefaultTimeout(60000); 

Before(function (scenario) {
  console.log(`[HOOK] Starting scenario: ${scenario.pickle.name}`);
  console.log(`[HOOK] Scenario tags: ${scenario.pickle.tags.map(tag => tag.name).join(', ')}`);
  
  request.setBaseUrl('https://reqres.in');
  settings.setReporterAutoRun(false);
  
  console.log(`[HOOK] Base URL set to: https://reqres.in`);
  console.log(`[HOOK] Reporter auto-run disabled`);
});

After(function (scenario) {
  if (scenario.result.status === 'failed') {
    console.log(`[HOOK] Scenario failed: ${scenario.pickle.name}`);
    console.log(`[HOOK] Error message: ${scenario.result.message}`);
  } else {
    console.log(`[HOOK] Scenario passed: ${scenario.pickle.name}`);
  }
  
  console.log(`[HOOK] Scenario result status: ${scenario.result.status}`);
});
