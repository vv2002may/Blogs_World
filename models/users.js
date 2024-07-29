const { uniq } = require('lodash');
const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },
},{timestamps: true});

const users = mongoose.model('users', blogSchema);

module.exports = users;