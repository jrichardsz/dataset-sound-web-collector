const fs = require("fs");
const os = require('os');
const path = require('path')
const xssEscape = require('xss-escape');
const multer = require('multer');

function LocalStorageHelper() {

    this.uploadMiddleware;

    this.init = async() => {

        var datasetAbsoluteLocation = process.env.STORAGE_ABSOLUTE_LOCATION || os.tmpdir();

        var storage = multer.diskStorage({
            destination: function(req, file, cb) {
                var mlClassId = xssEscape(req.query.mlClassId);
                fs.mkdir(path.join(datasetAbsoluteLocation, mlClassId), {
                    recursive: true
                }, async(err) => {
                    if (err) throw err;
                    cb(null, path.join(datasetAbsoluteLocation, mlClassId))
                });


            },
            filename: function(req, file, cb) {
                var originalname = xssEscape(file.originalname);
                cb(null, originalname)
            }
        })

        this.uploadMiddleware = multer({
            storage: storage
        });

    };


    this.getMiddleware = () => {
        return this.uploadMiddleware;
    };

}

module.exports = LocalStorageHelper;