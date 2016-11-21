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
		required: 'Please fill Song name',
		trim: true
	},
	surname: {
		type: String,
		default: '',
		required: 'Please fill your surname',
		trim: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill your email address',
		trim: true
	},
	hymnname: {
		type: String,
		default: '',
		required: 'Please fill your email address',
		trim: true
	},
	hymnnumber: {
		type: Number,
		default: 0
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
