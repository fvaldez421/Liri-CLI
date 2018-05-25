var twitter = require("twitter");
var keys = require("../keys");

module.exports = function() { // calls on twitter api with provided keys and prints last 20 tweets
    var client = new twitter(keys.twitterKeys);
    var params = {screen_name: "manbearpig_5"};

    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error) {
            for (i = 0; i < 20; i++) {
                console.log(tweets[i].text);				
            }
        }else {
            throw JSON.stringify(error);
        };
    })
};