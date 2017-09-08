var mongoose = require('mongoose');

// User Schema
var ProfileSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		index:true
	},
	time: {
         type : Date, 
         default: Date.now 
    }
});

var ProfileData = module.exports = mongoose.model('ProfileData', ProfileSchema);


module.exports.getUserTimeStampByUsername = function(username, callback){
	var query = {username: username};
	ProfileData.find(query, callback);
}

