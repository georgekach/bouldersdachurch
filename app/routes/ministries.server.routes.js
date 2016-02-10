'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var ministries = require('../../app/controllers/ministries.server.controller');

	// Ministries Routes
	app.route('/ministries')
		.get(ministries.list)
		.post(users.requiresLogin, ministries.create);

	app.route('/ministries/:ministryId')
		.get(ministries.read)
		.put(users.requiresLogin, ministries.hasAuthorization, ministries.update)
		.delete(users.requiresLogin, ministries.hasAuthorization, ministries.delete);

	// Finish by binding the Ministry middleware
	app.param('ministryId', ministries.ministryByID);
};
