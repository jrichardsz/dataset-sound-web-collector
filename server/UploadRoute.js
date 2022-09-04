var xssEscape = require('xss-escape');
const GoogleDriveHelper = require('../server/GoogleDriveHelper.js');

function UploadRoute() {

    const googleDriveHelper = new GoogleDriveHelper();
    googleDriveHelper.init()

    this.getRoute = (req, res, next) => {
        const file = req.file;
        console.log(file);
        console.log(req.query.mlClassId);
        var clazz = xssEscape(req.query.mlClassId).toUpperCase();
        var expectedGoogleDriveFolderId = process.env[`ML_CLASS_${clazz}_GDRIVE_FOLDER_ID`];
        if (typeof expectedGoogleDriveFolderId === 'undefined') {
            console.log("unsupported class name: " + clazz)
            expectedGoogleDriveFolderId = process.env['ML_CLASS_UNKNOWN_GDRIVE_FOLDER_ID'];
        }

        try {
            googleDriveHelper.uploadFile(file.path, file.mimetype, file.originalname, expectedGoogleDriveFolderId);
        } catch (err) {
            console.log(err)
        }
        res.send("Ok");
    };

}

module.exports = UploadRoute;