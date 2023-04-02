var fs = require('fs');
var path = require('path');
var serveStatic = require('serve-static')
var xssEscape = require('xss-escape');

function HomePageRoute(settings) {

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
        if (req.path === "/") {

            if(typeof req.query.uuidCampaign === 'undefined'){
                return res.render('index.html', {});    
            }

            let uuidData = settings[xssEscape(req.query.uuidCampaign)];

            if(typeof uuidData === 'undefined'){
                return res.render('index.html', {});    
            }

            let samplesKey = uuidData.samplesKey
            return res.render('index.html', {
                alias: uuidData.alias,
                samples: settings.samples[samplesKey]
            });
        } else {
            return staticAssets(req, res, next);
        }
    };

}

module.exports = HomePageRoute;