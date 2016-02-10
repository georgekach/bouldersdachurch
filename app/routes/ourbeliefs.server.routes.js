'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var ourbeliefs = require('../../app/controllers/ourbeliefs.server.controller');

	// Ourbeliefs Routes
	app.route('/ourbeliefs')
		.get(ourbeliefs.list)
		.post(users.requiresLogin, ourbeliefs.create);

	app.route('/ourbeliefs/:ourbeliefId')
		.get(ourbeliefs.read)
		.put(users.requiresLogin, ourbeliefs.hasAuthorization, ourbeliefs.update)
		.delete(users.requiresLogin, ourbeliefs.hasAuthorization, ourbeliefs.delete);

	// Finish by binding the Ourbelief middleware
	app.param('ourbeliefId', ourbeliefs.ourbeliefByID);
};
