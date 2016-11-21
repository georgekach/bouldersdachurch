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
		required: 'Please fill your Name',
		trim: true
	},
	surname: {
		type: String,
		default: '',
		required: 'Please fill your Surname',
		trim: true
	},
	emailaddress: {
		type: String,
		default: '',
		required: 'Please fill your Email Address',
		trim: true
	},
	contactnumber: {
		type: String,
		default: '',
		required: 'Please fill your Contact Number',
		trim: true
	},
	sharewithprayerband: {
		type: Boolean,
		default: false
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
