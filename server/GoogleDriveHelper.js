const stream = require('stream');
const multer = require('multer');
const fs = require('fs');
const {
    google
} = require('googleapis');

function GoogleDriveHelper() {

    // service account key file from Google Cloud console.
    const KEYFILEPATH = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_FILE_LOCATION;

    // Request full drive access.
    const SCOPES = ['https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.appdata'
    ];

    // Create a service account initialize with the service account key file and scope needed
    const auth = new google.auth.GoogleAuth({
        keyFile: KEYFILEPATH,
        scopes: SCOPES
    });

    auth.subject = 'user.account@domain.com';

    this.driveService;

    this.init = async() => {
        this.driveService = await google.drive({
            version: 'v3',
            auth
        });
    };


    this.uploadFile = async(filePath, mimetype, originalname, expectedGoogleDriveFolderId) => {
        try {
            const {
                data
            } = await this.driveService.files.create({
                media: {
                    mimeType: mimetype,
                    body: fs.createReadStream(filePath),
                },
                requestBody: {
                    name: originalname,
                    parents: [expectedGoogleDriveFolderId],
                },
                fields: 'id,name',
            });
            console.log(`Uploaded file ${data.name} ${data.id}`);
        } catch (err) {
        	console.log(err);
        }
    };

}

module.exports = GoogleDriveHelper;