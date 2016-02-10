'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Mediaresource = mongoose.model('Mediaresource'),
	_ = require('lodash');

/**
 * Create a Mediaresource
 */
exports.create = function(req, res) {
	var mediaresource = new Mediaresource(req.body);
	mediaresource.user = req.user;

	mediaresource.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mediaresource);
		}
	});
};

/**
 * Show the current Mediaresource
 */
exports.read = function(req, res) {
	res.jsonp(req.mediaresource);
};

/**
 * Update a Mediaresource
 */
exports.update = function(req, res) {
	var mediaresource = req.mediaresource ;

	mediaresource = _.extend(mediaresource , req.body);

	mediaresource.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mediaresource);
		}
	});
};

/**
 * Delete an Mediaresource
 */
exports.delete = function(req, res) {
	var mediaresource = req.mediaresource ;

	mediaresource.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mediaresource);
		}
	});
};

/**
 * List of Mediaresources
 */
exports.list = function(req, res) { 
	Mediaresource.find().sort('-created').populate('user', 'displayName').exec(function(err, mediaresources) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(mediaresources);
		}
	});
};

/**
 * Mediaresource middleware
 */
exports.mediaresourceByID = function(req, res, next, id) { 
	Mediaresource.findById(id).populate('user', 'displayName').exec(function(err, mediaresource) {
		if (err) return next(err);
		if (! mediaresource) return next(new Error('Failed to load Mediaresource ' + id));
		req.mediaresource = mediaresource ;
		next();
	});
};

/**
 * Mediaresource authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.mediaresource.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
