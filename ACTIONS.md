# Continuous Integration (CI/CD) with GitHub Actions

![image](https://github.com/user-attachments/assets/d8e81838-f2ad-4f5b-aa21-1b7aa015d135)


This repository uses GitHub Actions to automate the Continuous Integration (CI/CD) process. This includes checking out the repository, installing dependencies, running tests, generating reports, and uploading the test reports.

## GitHub Actions Workflow

The workflow file is located at `.github/workflows/qa-automation-api.yml` and is configured to run on every manual trigger using the `workflow_dispatch` event.

![image](https://github.com/user-attachments/assets/a4edc497-8d36-4839-b477-c42009fda302)

### Workflow Configuration

The workflow configuration is as follows:

```yaml
name: CI/CD

on:
  workflow_dispatch:
    inputs:
      os:
        description: 'Choose the OS for the workflow'
        required: true
        default: 'ubuntu-latest'
        type: choice
        options:
          - 'ubuntu-latest'
          - 'windows-latest'
          - 'macOS-latest'
      create_report:
        description: 'Choose whether to create and upload the test report'
        required: true
        default: 'no'
        type: choice
        options:
          - 'yes'
          - 'no'
      node_version:
        description: 'Choose the Node.js version for the workflow'
        required: true
        default: '21'
        type: choice
        options:
          - '15'
          - '18'
          - '20'
          - '21'

jobs:
  qa-automation-api:
    runs-on: ${{ github.event.inputs.os }} 

    steps:
    - name: Checkout repo
      uses: actions/checkout@v2 

    - name: Set up Node.js ${{ github.event.inputs.node_version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ github.event.inputs.node_version }}

    - name: Install dependencies
      run: |
        npm i 

    - name: Run tests
      run: |
        npm test  

    - name: Run report
      if: ${{ github.event.inputs.create_report == 'yes' }}
      run: |
        npm run report  

    - name: Upload test report
      if: ${{ github.event.inputs.create_report == 'yes' }}
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

2. Set Up Node.js:
```yml
  
- name: Set up Node.js ${{ github.event.inputs.node_version }}
  uses: actions/setup-node@v3
  with:
    node-version: ${{ github.event.inputs.node_version }}
```
   
2. Install Dependencies:
```yml
 - name: Install dependencies
   run: |
      npm i 
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
- name: Run report
  if: ${{ github.event.inputs.create_report == 'yes' }}
  run: |
     npm run report  
```
This step generates a test report after the tests have been executed using npm run report.

5. Upload Test Report:
```yml
- name: Upload test report
  if: ${{ github.event.inputs.create_report == 'yes' }}
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

![image](https://github.com/user-attachments/assets/8e5141d8-5fd1-4d55-86d1-af2e0d55c378)

[Execute](https://github.com/thiagotobiasturk/Pactum-JS-Cucumber-Api/actions/workflows/qa_automation_api.yml)
