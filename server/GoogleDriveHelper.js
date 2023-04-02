const stream = require('stream');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
const {
    google
} = require('googleapis');
const os = require("os");

function GoogleDriveHelper() {

    const tempDir = os.tmpdir();

    this.driveService;

    this.init = async() => {

        var serviceAccountFileLocation = process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_FILE_LOCATION ||  path.join(tempDir, "service_account_file.json");
        var serviceAccountFileExist = await fsExtra.pathExists(serviceAccountFileLocation);

        if (!serviceAccountFileExist) {
            console.log("service_account_file.json don't exist. Creating...")
            let decodedContent = Buffer.from(process.env.GOOGLE_DRIVE_SERVICE_ACCOUNT_FILE_CONTENT.toString('utf8'), 'base64').toString('ascii')
            await fs.promises.writeFile(serviceAccountFileLocation, decodedContent, {
                encoding: 'utf8'
            });
        }

        // Request full drive access.
        const scopes = ['https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.appdata'
        ];

        // Create a service account initialize with the service account key file and scope needed
        const auth = new google.auth.GoogleAuth({
            keyFile: serviceAccountFileLocation,
            scopes: scopes
        });

        this.driveService = await google.drive({
            version: 'v3',
            auth
        });
    };


    this.uploadFile = async(filePath, mimetype, originalname, googleDriveFolderId) => {
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
                    parents: [googleDriveFolderId],
                },
                fields: 'id,name',
            });
            console.log(`Uploaded file ${data.name} ${data.id}`);
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

}

module.exports = GoogleDriveHelper;