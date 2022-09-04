const Entrypoint = require('./server/Entrypoint.js');
const entrypoint = new Entrypoint();

(async function() {
	await entrypoint.init();
	entrypoint.start();
})();
