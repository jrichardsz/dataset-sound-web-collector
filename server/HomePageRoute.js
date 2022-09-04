var fs = require('fs');
var path = require('path');
var serveStatic = require('serve-static')

function HomePageRoute() {

    var variablesLocation = path.join(process.env.npm_config_local_prefix, "variables", "index.json");
    var staticAssets = new serveStatic(path.join(process.env.npm_config_local_prefix, "web"), {
        'index': ['default.html', 'default.htm']
    })

    this.init = (expressInstance) => {
        expressInstance.set('view engine', 'ejs');
        expressInstance.set('views', path.join(process.env.npm_config_local_prefix, "web"));
        expressInstance.engine('html', require('ejs').renderFile);
    };    
    this.getRoute = (req, res, next) => {
        if (req.url === "/") {
            // render home page
            res.render('index.html', require(variablesLocation));
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
    };

}

module.exports = HomePageRoute;