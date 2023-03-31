const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra')
const express = require('express');
const app = express();
const https = require('https');
const http = require('http');
const LocalStorageHelper = require('./LocalStorageHelper.js');
const SecurityHelper = require('./SecurityHelper.js');
const HomePageRoute = require('./HomePageRoute.js');
const UploadRoute = require('./UploadRoute.js');
const os = require("os");
const yaml = require('js-yaml');

function Entrypoint() {

    var port = process.env.PORT || 2708;
    var options;
    const tempDir = os.tmpdir();
    var settings;

    this.init = async() => {

        settings = yaml.load(fs.readFileSync(process.env.CUSTOM_SETTINGS_LOCATION || path.join(process.env.npm_config_local_prefix, "settings.yaml"), 'utf8'));
        console.log(settings);        

        if (process.env.ENABLE_HTTPS === "true") {
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
        }

        const localStorageHelper = new LocalStorageHelper();
        localStorageHelper.init()

        const securityHelper = new SecurityHelper();
        securityHelper.init(app)

        const homePageRoute = new HomePageRoute(settings);
        await homePageRoute.init(app)

        const uploadRoute = new UploadRoute(settings);

        app.post('/upload', localStorageHelper.getMiddleware().single('file'), uploadRoute.performUpload);

        app.get('*', homePageRoute.getRoute);
    };

    this.start = () => {

        if (process.env.ENABLE_HTTPS === "true") {
            https.createServer(options, app).listen(port, function() {
                console.log("Express server listening on port " + port);
            });
        } else {
            http.createServer(options, app).listen(port, function() {
                console.log("Express server listening on port " + port);
            });
        }
    };

}

module.exports = Entrypoint;