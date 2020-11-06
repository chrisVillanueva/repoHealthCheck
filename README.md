# repoHealthCheck

repo healthcheck app

# Installation

from terminal:
create project directory
npm init
npm install --save @google-cloud/functions-framework

# Local

run from terminal:
npx @google-cloud/functions-framework --target=[functionName]

from package.json
"scripts": {
"start": "functions-framework --target=[functionName]"
}
run from terminal:
npm start

# Google Cloud

https://us-east1-manning-github-health-score.cloudfunctions.net/repoHealthCheck/getRepoData?repoName=repo-name&repoOwner=repo-owner
