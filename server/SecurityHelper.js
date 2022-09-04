
function SecurityHelper() {

    this.init = (expressInstance) => {
        if (process.env.ENABLE_SECURITY == "true") {

            const basicAuth = require('express-basic-auth');
            var userName = process.env.AUTH_USER;
            var users = {};
            users[userName] = process.env.AUTH_PASSWORD;
            expressInstance.use(basicAuth({
                users: users,
                challenge: true
            }))
        }
    };

}

module.exports = SecurityHelper;