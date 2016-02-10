'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Prayerrequest Schema
 */
var PrayerrequestSchema = new Schema({
	requestdetail: {
		type: String,
		default: '',
		required: 'Please fill your request',
		trim: true
	},
	name: {
		type: String,
		default: '',
		required: 'Please fill your request',
		trim: true
	},
	surname: {
		type: String,
		default: '',
		required: 'Please fill your request',
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

mongoose.model('Prayerrequest', PrayerrequestSchema);
