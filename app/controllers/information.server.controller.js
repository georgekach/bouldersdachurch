'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Information = mongoose.model('Information'),
	_ = require('lodash');

/**
 * Create a Information
 */
exports.create = function(req, res) {
	var information = new Information(req.body);
	information.user = req.user;

	information.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(information);
		}
	});
};

/**
 * Show the current Information
 */
exports.read = function(req, res) {
	res.jsonp(req.information);
};

/**
 * Update a Information
 */
exports.update = function(req, res) {
	var information = req.information ;

	information = _.extend(information , req.body);

	information.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(information);
		}
	});
};

/**
 * Delete an Information
 */
exports.delete = function(req, res) {
	var information = req.information ;

	information.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(information);
		}
	});
};

/**
 * List of Information
 */
exports.list = function(req, res) { 
	Information.find().sort('-created').populate('user', 'displayName').exec(function(err, information) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(information);
		}
	});
};

/**
 * Information middleware
 */
exports.informationByID = function(req, res, next, id) { 
	Information.findById(id).populate('user', 'displayName').exec(function(err, information) {
		if (err) return next(err);
		if (! information) return next(new Error('Failed to load Information ' + id));
		req.information = information ;
		next();
	});
};

/**
 * Information authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.information.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
