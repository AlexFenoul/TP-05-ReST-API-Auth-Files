var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    user: String, 
    password: String, 
}, { toObject: { versionKey: false } }); 
 
module.exports = mongoose.model('User', userSchema);