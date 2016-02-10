'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var baptismmembershiprequests = require('../../app/controllers/baptismmembershiprequests.server.controller');

	// Baptismmembershiprequests Routes
	app.route('/baptismmembershiprequests')
		.get(baptismmembershiprequests.list)
		.post(users.requiresLogin, baptismmembershiprequests.create);

	app.route('/baptismmembershiprequests/:baptismmembershiprequestId')
		.get(baptismmembershiprequests.read)
		.put(users.requiresLogin, baptismmembershiprequests.hasAuthorization, baptismmembershiprequests.update)
		.delete(users.requiresLogin, baptismmembershiprequests.hasAuthorization, baptismmembershiprequests.delete);

	// Finish by binding the Baptismmembershiprequest middleware
	app.param('baptismmembershiprequestId', baptismmembershiprequests.baptismmembershiprequestByID);
};
