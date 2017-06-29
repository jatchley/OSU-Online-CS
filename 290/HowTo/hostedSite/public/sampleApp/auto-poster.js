var twitterApi = require('twitter-node-client').Twitter;

var authConfig = {
	'consumerKey': '0MBxGdyMOPqcci3ddcle4CW2V',
    'consumerSecret': 'xZ8E59PPPXGwff5RV32wz0hkKHO0UUG9EuHRli3fcdyZAuvPvL',
	'accessToken': '1902102560-FT4yNebVO6QHSIqWH5M15runq19hAeTSJLYDaWV',
	'accessTokenSecret': 'UKo7uVHSzuWkrkmnMxlK95xFaUq1yLhba2GYP8BBAWDpN',
    'callback': ''
};

// Create our Twitter instance
var twitter = new twitterApi(authConfig);

// Callback functions
function errorCallback (error) {
	console.log("Error: " + error);
}

// Get last message received
function getLastMessage () {
	var url = "/direct_messages.json";
	var params = { "count" : 1 };
	
	twitter.getCustomApiCall(url, params, errorCallback, function(data) {
		data = JSON.parse(data);
		console.log("Successfully Retrieved Last Direct Message");
		console.log("Message Text: " + data[0].text);
		console.log("Message Sender: " + data[0].sender.name);
		console.log("Message Sent: " + data[0].created_at);
		console.log("Message Recipient: " + data[0].recipient.name);
	});
}

//getLastMessage();

// Find a user ID by screen name
function getUserIdByScreenName(name) {
	var url = "/users/lookup.json";
	var params = { screen_name : name };
	
	twitter.getCustomApiCall(url, params, errorCallback, function (data) {
		data = JSON.parse(data);
		for (var i = 0; i < data.length; i++) {
			if (data[i].screen_name == name) {
				console.log("Name matches! User ID for " + name + " is " + data[i].id_str);
			}
		}
	});
}

// Get most recent message from user ID
function getLastMessageBySenderId (senderId) {
	var url = "/direct_messages.json";
	var params = { "count" : 200 };
	
	twitter.getCustomApiCall(url, params, errorCallback, function(data) {
		data = JSON.parse(data);
		
		for (var i = 0; i < data.length; i++) {
			if (data[i].sender_id == senderId) {
				console.log("Successfully Retrieved Last Message from User ID " + senderId);
				console.log("Message Text: " + data[i].text);
				console.log("Message Sender: " + data[i].sender.name);
				console.log("Message Sent: " + data[i].created_at);
				console.log("Message Recipient: " + data[i].recipient.name);
				console.log("Message Sender ID: " + data[i].sender_id);
			}
		}
	});
}

// Combination of the above
function getLastMessageByScreenName(name) {
	var url = "/users/lookup.json";
	var params = { screen_name : name };
	
	twitter.getCustomApiCall(url, params, errorCallback, function (data) {
		data = JSON.parse(data);
		var matchingId = 0;
		for (var i = 0; i < data.length; i++) {
			if (data[i].screen_name == name) {
				console.log("Name matches! User ID for " + name + " is " + data[i].id_str);
				matchingId = data[i].id_str;
				break;
			}
		}
			
		url = "/direct_messages.json";
		params = { "count" : 200 };
		
		twitter.getCustomApiCall(url, params, errorCallback, function(data) {
			data = JSON.parse(data);
			
			for (var i = 0; i < data.length; i++) {
				if (data[i].sender_id == matchingId) {
					console.log("Successfully Retrieved Last Message from User ID " + matchingId);
					console.log("Message Text: " + data[i].text);
					console.log("Message Sender: " + data[i].sender.name);
					console.log("Message Sent: " + data[i].created_at);
					console.log("Message Recipient: " + data[i].recipient.name);
					console.log("Message Sender ID: " + data[i].sender_id);
					break;
				}
			}
		});
	});
}

getLastMessageByScreenName("WesSailing");





