const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

module.exports.uploadFileToBucket = async (filename, bucket) => {
    await storage.bucket(bucket).upload(filename, {
        gzip: true,
        metadata: {
            cacheControl: 'public, max-age=31536000',
        },
    });
    console.log(`BUCKET STORAGE: ${filename} uploaded to ${bucket}.`);
}