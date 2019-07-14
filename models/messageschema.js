const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let message = new Schema({
  username: 'string',
  message: 'string',
  _id: 'string'
}, {
  versionKey: false
});

module.exports.Message = mongoose.model('Message', message);
