'use strict';
var multiparty = require('connect-multiparty'),
	multipartyMiddleware = multiparty();

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var information = require('../../app/controllers/information.server.controller');

	// Information Routes
	app.route('/information')
		.get(information.list)
		.post(users.requiresLogin, information.create);

	app.route('/information/:informationId')
		.get(information.read)
		.put(users.requiresLogin, information.hasAuthorization, information.update)
		.delete(users.requiresLogin, information.hasAuthorization, information.delete);

	app.route('/localstaff')
		.get(information.list);

	app.route('/upload/image')
		.post(information.postImage,multipartyMiddleware);

	// Finish by binding the Information middleware
	app.param('informationId', information.informationByID);
};
