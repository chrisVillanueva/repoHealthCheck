const fs = require('fs');
const path = require('path');

module.exports.removeFilesFromLocalDirectory = (dir) => {
    fs.readdir(dir, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(dir, file), err => {
                if (err) throw err;
            });
        }
    });
};

