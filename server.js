var fs = require('fs');
var express = require('express');
var app = express();
var serveStatic = require('serve-static')
var staticAssets = new serveStatic(__dirname + "/web", {
    'index': ['default.html', 'default.htm']
})
var https = require('https')
var xssEscape = require('xss-escape');

const GoogleDriveHelper = require('./server/GoogleDriveHelper.js');
const googleDriveHelper = new GoogleDriveHelper();
googleDriveHelper.init()

const LocalStorageHelper = require('./server/LocalStorageHelper.js');
const localStorageHelper = new LocalStorageHelper();
localStorageHelper.init()

const SecurityHelper = require('./server/SecurityHelper.js');
const securityHelper = new SecurityHelper();
securityHelper.init(app)


var variablesFolder = __dirname + "/variables";

var port = process.env.PORT || 2708;

app.set('view engine', 'ejs');
app.set('views', __dirname + "/web");
app.engine('html', require('ejs').renderFile);

/*Optional security*/


app.post('/save-record', localStorageHelper.getMiddleware().single('file'), async function(req, res, next) {
    const file = req.file;
    console.log(file);
    console.log(req.query.mlClassId);
    var clazz = xssEscape(req.query.mlClassId).toUpperCase();
    var expectedGoogleDriveFolderId  = process.env[`ML_CLASS_${clazz}_GDRIVE_FOLDER_ID`];
    if(typeof expectedGoogleDriveFolderId === 'undefined'){
        console.log("unsupported class name: "+clazz)
        expectedGoogleDriveFolderId = process.env['ML_CLASS_UNKNOWN_GDRIVE_FOLDER_ID'];
    }

    try{
        googleDriveHelper.uploadFile(file.path, file.mimetype, file.originalname, expectedGoogleDriveFolderId);
    }catch(err){
        console.log(err)
    }
    res.send("Ok");
});


app.get('*', function(req, res, next) {

    if (req.url === "/") {
        // render home page
        res.render('index.html', require(variablesFolder + "/index.json"));
    } else if (req.url.endsWith(".html")) {
        // render another pages
        console.log("requested resource:" + req.url);
        var relativeResourcePath = req.url.substring(1, req.url.length);
        console.log("requested resource relative path: " + relativeResourcePath);
        var resourceVariablesPath = variablesFolder + "/" + relativeResourcePath.replace(".html", ".json")
        if (fs.existsSync(resourceVariablesPath)) {
            res.render(relativeResourcePath, require(resourceVariablesPath));
        } else {
            res.render(relativeResourcePath, {});
        }

    } else {
        return staticAssets(req, res, next);
    }

});

var options = {
    key: fs.readFileSync(process.env.PRIVATE_KEY_ABSOLUTE_LOCATION),
    cert: fs.readFileSync(process.env.CERTIFICATE_ABSOLUTE_LOCATION)
};

var server = https.createServer(options, app).listen(port, function() {
    console.log("Express server listening on port " + port);
});