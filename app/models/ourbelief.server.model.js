'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Ourbelief Schema
 */
var OurbeliefSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill beleif name',
		trim: true
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill Description',
		trim: true
	},
	biblereferences: {
		type: String,
		default: '',
		required: 'Please fill references',
		trim: true
	},
	beleiefnumber:{
		type: Number,
		default: 0,
		required: 'Please fill references',
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

mongoose.model('Ourbelief', OurbeliefSchema);
