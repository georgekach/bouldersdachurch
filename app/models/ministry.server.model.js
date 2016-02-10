'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ministry Schema
 */
var MinistrySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Ministry name',
		trim: true
	},
	description:{
		type: String,
		default: '',
		trim: true
	},
	contact:{
		type: String,
		default: '',
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

mongoose.model('Ministry', MinistrySchema);
