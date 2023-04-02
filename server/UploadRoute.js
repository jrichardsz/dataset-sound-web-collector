var xssEscape = require('xss-escape');
const GoogleDriveHelper = require('../server/GoogleDriveHelper.js');

function UploadRoute(settings) {

    const googleDriveHelper = new GoogleDriveHelper();
    googleDriveHelper.init()

    this.performUpload = async (req, res, next) => {
        const file = req.file;
        console.log(file);
        console.log(req.query);

        var clazz = xssEscape(req.query.mlClassId);
        var uuidCampaign = xssEscape(req.query.uuidCampaign);

        if(typeof settings[uuidCampaign] === 'undefined'){
           return res.send("unknown uuidCampaign");
        }

        var expectedGoogleDriveFolderId = settings[uuidCampaign].gdriveIdByMlClass[clazz];
        if (typeof expectedGoogleDriveFolderId === 'undefined') {
            console.log("unsupported class name: " + clazz)
            expectedGoogleDriveFolderId = settings[uuidCampaign].gdriveIdByMlClass.unknown;
        }

        try {
            await googleDriveHelper.uploadFile(file.path, file.mimetype, file.originalname, expectedGoogleDriveFolderId);
        } catch (err) {
            return res.status(500).send(JSON.stringify(err.errors));
        }
        res.send("Ok");
    };

}

module.exports = UploadRoute;