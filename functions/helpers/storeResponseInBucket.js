const fs = require('fs');
const path = require('path');
const { uploadFileToBucket } = require('./../helpers/uploadFileToBucket');
const { removeFilesFromLocalDirectory } = require('./../helpers/removeFilesFromLocalDirectory');
const { GITHUB_DATA_FILE_CATEGORIES, GOOGLE_CLOUD_PROJECT_BUCKET,TMP_SUBDIRECTORY } = require('./../../constants');

module.exports.storeResponseInBucket = async (data) => {
    const {name} = data.repository;

    GITHUB_DATA_FILE_CATEGORIES.forEach( category => {
        const fileName = `${TMP_SUBDIRECTORY}/${name}-${category}.json`;
        const storeObj = { name, [category]: data['repository'][category] };
        fs.writeFileSync(fileName, JSON.stringify(storeObj));
        uploadFileToBucket( fileName, GOOGLE_CLOUD_PROJECT_BUCKET)
            .catch(console.error);
    });

    //cleanup
    removeFilesFromLocalDirectory(TMP_SUBDIRECTORY);

};
