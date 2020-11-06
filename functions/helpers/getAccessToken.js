const { SecretManagerServiceClient } = require('@google-cloud/secret-manager');
const { GOOGLE_CLOUD_GITHUB_ACCESS_TOKEN } = require('../../constants');
const client = new SecretManagerServiceClient();
module.exports.getAccessToken = async function () {
    const [version] = await client.accessSecretVersion({
        name: GOOGLE_CLOUD_GITHUB_ACCESS_TOKEN,
    });
    return version.payload.data.toString('utf8');
};