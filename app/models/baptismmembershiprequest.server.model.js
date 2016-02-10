'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Baptismmembershiprequest Schema
 */
var BaptismmembershiprequestSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill your name',
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
		required: 'Please fill your contact email',
		trim: true
	},
	contactnumber: {
		type: String,
		default: '',
		required: 'Please fill your contact number',
		trim: true
	},
	currentmembership: {
		type: String,
		default: '',
		required: 'Please fill your current membership',
		trim: true
	},
	membershiptransfer: {
		type: Boolean,
		default: false
	},
	baptismrequest: {
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

mongoose.model('Baptismmembershiprequest', BaptismmembershiprequestSchema);
