const fetch = require('node-fetch');
const { GITHUB_API_URL } =require('../constants');
const { getAccessToken } = require('./helpers/getAccessToken');
const { buildRepoQuery } = require('./helpers/buildRepoQuery');
const { storeResponseInBucket } = require('./helpers/storeResponseInBucket');

exports.getRepoData = async function(req, res) {
  const {repoName, repoOwner} = req.query;

  if (!(repoName && repoOwner)) res.status(200).send("error: send a valid repo name and owner"); 

  const githubAccessToken = await getAccessToken();
  fetch(`${GITHUB_API_URL}/graphql`, {
        method: 'POST',
        body: JSON.stringify({ 
          query: buildRepoQuery({
            name: repoName, 
            owner: repoOwner
          })  
        }),
        headers: {
            'Authorization': `Bearer ${githubAccessToken}`,
        },
  })
  .then(res => res.text())
  .then(body => {
        const { data } = JSON.parse(body);
        console.log(`Github repsonse: ${JSON.stringify(data)}`);
        storeResponseInBucket(data);
        res.send(data); 
    }) 
  .catch(error => console.error(error));
};


/**
 * spinnaker / spinnaker
 * argoproj / argo
 * fluxcd / flux
*/
//
// v3
//
// pull requests
// https://api.github.com/repos/spinnaker/spinnaker/pulls
// https://api.github.com/repos/argoproj/argo/pulls
// https://api.github.com/repos/fluxcd/flux/pulls
//
// stats => contributors
// https://api.github.com/repos/spinnaker/spinnaker/stats/contributors
// https://api.github.com/repos/argoproj/argo/stats/contributors
// https://api.github.com/repos/fluxcd/flux/stats/contributors
//
// issues
// https://api.github.com/repos/spinnaker/spinnaker/issues
// https://api.github.com/repos/argoproj/argo/issues
// https://api.github.com/repos/fluxcd/flux/issues

