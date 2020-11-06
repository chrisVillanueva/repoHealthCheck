const { helloWorld } = require('./functions/helloWorld');
const { getRepoData } = require('./functions/githubAPIs');

exports.helloWorld = helloWorld;
exports.getRepoData = getRepoData;

exports.repoHealthCheck = (req, res) => {

    switch (req.path) {
        case "/":
            return res.send(200);

        case "/helloWorld":
            return helloWorld(req, res);

        case "/getRepoData":

            return getRepoData(req, res);

        default:
            res.send("No function to test!");
    }
}