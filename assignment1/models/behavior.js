var mongoose = require('mongoose');

// User behaviors
var BehaviorSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
		index:true
	},
	action: {
         type : String
    }
});

var BehaviorData = module.exports = mongoose.model('BehaviorData', BehaviorSchema);


module.exports.getUserBehaviorsByUsername = function(username, callback){
	var query = {username: username};
	BehaviorData.find(query, callback);
}
