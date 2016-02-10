'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var songrequests = require('../../app/controllers/songrequests.server.controller');

	// Songrequests Routes
	app.route('/songrequests')
		.get(songrequests.list)
		.post(users.requiresLogin, songrequests.create);

	app.route('/songrequests/:songrequestId')
		.get(songrequests.read)
		.put(users.requiresLogin, songrequests.hasAuthorization, songrequests.update)
		.delete(users.requiresLogin, songrequests.hasAuthorization, songrequests.delete);

	// Finish by binding the Songrequest middleware
	app.param('songrequestId', songrequests.songrequestByID);
};
