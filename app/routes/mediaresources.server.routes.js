'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var mediaresources = require('../../app/controllers/mediaresources.server.controller');

	// Mediaresources Routes
	app.route('/mediaresources')
		.get(mediaresources.list)
		.post(users.requiresLogin, mediaresources.create);

	app.route('/mediaresources/:mediaresourceId')
		.get(mediaresources.read)
		.put(users.requiresLogin, mediaresources.hasAuthorization, mediaresources.update)
		.delete(users.requiresLogin, mediaresources.hasAuthorization, mediaresources.delete);

	// Finish by binding the Mediaresource middleware
	app.param('mediaresourceId', mediaresources.mediaresourceByID);
};
