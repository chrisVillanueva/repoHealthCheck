module.exports.buildRepoQuery = (repo) => {
    if(!repo) return "error: send a valid repo object";

    return `
    {
        repository(name: ${repo.name}, owner: ${repo.owner}) {
            name
            forkCount
            issues {
            totalCount
            }
            pullRequests {
            totalCount
            }
            releases {
            totalCount
            }
            stargazers {
            totalCount
            }
            watchers {
            totalCount
            }
        }
    }`
};
