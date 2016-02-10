'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var eventstimelines = require('../../app/controllers/eventstimelines.server.controller');

	// Eventstimelines Routes
	app.route('/eventstimelines')
		.get(eventstimelines.list)
		.post(users.requiresLogin, eventstimelines.create);

	app.route('/eventstimelines/:eventstimelineId')
		.get(eventstimelines.read)
		.put(users.requiresLogin, eventstimelines.hasAuthorization, eventstimelines.update)
		.delete(users.requiresLogin, eventstimelines.hasAuthorization, eventstimelines.delete);

	// Finish by binding the Eventstimeline middleware
	app.param('eventstimelineId', eventstimelines.eventstimelineByID);
};
