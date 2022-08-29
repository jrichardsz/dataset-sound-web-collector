var express = require('express');
var app = express();
var serveStatic = require('serve-static')
var staticAssets = new serveStatic(__dirname + "/web", {
    'index': ['default.html', 'default.htm']
})
const fs = require("fs");
var os = require('os');
var path = require('path')
var https = require('https')
var xssEscape = require('xss-escape');
const multer = require('multer');

var datasetAbsoluteLocation = process.env.storage_absolute_location || os.tmpdir();

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        var mlClassId = xssEscape(req.query.mlClassId);
        fs.mkdir(path.join(datasetAbsoluteLocation, mlClassId), {
            recursive: true
        }, (err) => {
            if (err) throw err;
            cb(null, path.join(datasetAbsoluteLocation, mlClassId))
        });


    },
    filename: function(req, file, cb) {
        var originalname = xssEscape(file.originalname);
        cb(null, originalname)
    }
})

const upload = multer({
    storage: storage
});

var variablesFolder = __dirname + "/variables";

// set the port of our application
var port = process.env.PORT || 2708;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', __dirname + "/web");
// use .html instead .ejs
app.engine('html', require('ejs').renderFile);

/*Optional security*/
if (process.env.ENABLE_SECURITY == "true") {

    const basicAuth = require('express-basic-auth');
    var userName = process.env.AUTH_USER;
    var users = {};
    users[userName] = process.env.AUTH_PASSWORD;
    app.use(basicAuth({
        users: users,
        challenge: true
    }))
}



app.post('/save-record', upload.single('file'), function(req, res, next) {
    const file = req.file;
    console.log(file);
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
    key: fs.readFileSync(process.env.private_key_absolute_location),
    cert: fs.readFileSync(process.env.certificate_absolute_location)
};

var server = https.createServer(options, app).listen(port, function() {
    console.log("Express server listening on port " + port);
});