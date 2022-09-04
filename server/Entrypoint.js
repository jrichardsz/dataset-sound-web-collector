const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra')
const express = require('express');
const app = express();
const https = require('https');
const LocalStorageHelper = require('./LocalStorageHelper.js');
const SecurityHelper = require('./SecurityHelper.js');
const HomePageRoute = require('./HomePageRoute.js');
const UploadRoute = require('./UploadRoute.js');
const os = require("os");

function Entrypoint() {

    var port = process.env.PORT || 2708;
    var options;
    const tempDir = os.tmpdir();

    this.init = async() => {

        var ppkLocation = process.env.PRIVATE_KEY_ABSOLUTE_LOCATION || path.join(tempDir, "private_key.pem")
        var certLocation = process.env.CERTIFICATE_ABSOLUTE_LOCATION || path.join(tempDir, "cert.pem")

        var ppkExist = await fsExtra.pathExists(ppkLocation);
        var certExist = await fsExtra.pathExists(certLocation);

        if (!ppkExist) {
            console.log("ppk don't exist. Creating...")
            let decodedContent = Buffer.from(process.env.PRIVATE_KEY_ABSOLUTE_CONTENT.toString('utf8'), 'base64').toString('ascii')
            await fs.promises.writeFile(ppkLocation, decodedContent, {
                encoding: 'utf8'
            });
        }

        if (!certExist) {
            console.log("cert don't exist. Creating...")
            let decodedContent = Buffer.from(process.env.CERTIFICATE_ABSOLUTE_CONTENT.toString('utf8'), 'base64').toString('ascii')            
            await fs.promises.writeFile(certLocation, decodedContent, {
                encoding: 'utf8'
            });
        }


        options = {
            key: await fs.promises.readFile(ppkLocation),
            cert: await fs.promises.readFile(certLocation)
        };

        const localStorageHelper = new LocalStorageHelper();
        localStorageHelper.init()

        const securityHelper = new SecurityHelper();
        securityHelper.init(app)

        const homePageRoute = new HomePageRoute();
        await homePageRoute.init(app)

        const uploadRoute = new UploadRoute();

        app.post('/save-record', localStorageHelper.getMiddleware().single('file'), uploadRoute.getRoute);

        app.get('*', homePageRoute.getRoute);
    };

    this.start = () => {
        var server = https.createServer(options, app).listen(port, function() {
            console.log("Express server listening on port " + port);
        });
    };

}

module.exports = Entrypoint;