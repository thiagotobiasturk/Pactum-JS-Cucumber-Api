# Continuous Integration (CI/CD) with GitHub Actions

This repository uses GitHub Actions to automate the Continuous Integration (CI/CD) process. This includes checking out the repository, installing dependencies, running tests, generating reports, and uploading the test reports.

## GitHub Actions Workflow

The workflow file is located at `.github/workflows/qa-automation-api.yml` and is configured to run on every manual trigger using the `workflow_dispatch` event.

### Workflow Configuration

The workflow configuration is as follows:

```yaml
name: CI/CD

on:
  workflow_dispatch: 

jobs:
  build:
    runs-on: ubuntu-latest 

    steps:
    - name: Checkout repo
      uses: actions/checkout@v2 

    - name: Install dependencies
      run: |
        npm install 

    - name: Run tests
      run: |
        npm test  

    - name: Generate test report
      run: |
        npm run report  

    - name: Upload test report
      uses: actions/upload-artifact@v4
      with:
        name: test-report
        path: |
            ./reports/cucumber_report.json
            ./reports/cucumber_report.html

```

### Workflow Steps Explained
1. Checkout Repository:
```yml
- name: Checkout repo
  uses: actions/checkout@v2
```
This step checks out the repository code to the runner, making it available for subsequent steps.

2. Install Dependencies:
```yml
- name: Install dependencies
  run: |
    npm install
```
This step installs all the dependencies required for the project using npm install.

3. Run Tests:
```yml
- name: Run tests
  run: |
    npm test
```
This step runs the tests defined in the project using npm test.

4. Generate Test Report:
```yml
- name: Generate test report
  run: |
    npm run report
```
This step generates a test report after the tests have been executed using npm run report.

5. Upload Test Report:
```yml
- name: Upload test report
  uses: actions/upload-artifact@v4
  with:
    name: test-report
    path: |
        ./reports/cucumber_report.json
        ./reports/cucumber_report.html

```

This step uploads the generated test report as an artifact named `test-report`. The report is saved in the `./reports` directory and is named `cucumber_report.json` and `cucumber_report.html` .

### Triggering the Workflow
The workflow is manually triggered via the GitHub Actions UI. To start the workflow, navigate to the `Actions` tab in your GitHub repository, select the `CI` workflow, and click the `Run workflow` button.

![image](https://github.com/user-attachments/assets/0d860a9c-8d9d-47f5-aee8-495da54ee678)

