'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var prayerrequests = require('../../app/controllers/prayerrequests.server.controller');

	// Prayerrequests Routes
	app.route('/prayerrequests')
		.get(prayerrequests.list)
		.post(users.requiresLogin, prayerrequests.create);

	app.route('/prayerrequests/:prayerrequestId')
		.get(prayerrequests.read)
		.put(users.requiresLogin, prayerrequests.hasAuthorization, prayerrequests.update)
		.delete(users.requiresLogin, prayerrequests.hasAuthorization, prayerrequests.delete);

	// Finish by binding the Prayerrequest middleware
	app.param('prayerrequestId', prayerrequests.prayerrequestByID);
};
