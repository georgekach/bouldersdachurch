'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Songrequest Schema
 */
var SongrequestSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Songrequest name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Songrequest', SongrequestSchema);