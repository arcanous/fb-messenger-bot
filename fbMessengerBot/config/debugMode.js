

var debugMode = {};

module.exports = {
	
	getDebugMode : function (userId) {
		return !!debugMode[userId];
	},


	setDebugMode : function (userId, mode) {
		debugMode[userId] = mode;
	}

};