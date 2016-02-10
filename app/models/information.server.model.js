'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Information Schema
 */
var InformationSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Information name',
		trim: true
	},
	rankingnumber:{
		type: Number,
		default: 0
	},
	emailaddress:{
		type: String,
		default: '',
		trim: true
	},
	contactnumber:{
		type: String,
		default: '',
		trim: true
	},
	officersposition:{
		type: String,
		default:'',
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

mongoose.model('Information', InformationSchema);
