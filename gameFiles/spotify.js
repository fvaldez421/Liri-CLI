var Spotify = require("node-spotify-api");
var inquirer = require("inquirer");

var keys = require("../keys.js");

module.exports = function(ranSong) {
	if (!ranSong) {
        inquirer.prompt([
            {
            type: "input",
            message: "What song?",
            name: "userTrack"
            },
        ]).then(function(input) {
            song = input.userTrack;

            if (input.userTrack === "") {
                song = "The Sign, Ace of Base";
            };
            searchSong(input); 
        });
    }else if (ranSong) {
        song = ranSong;
        searchSong();
    };

    function searchSong() {
        var spotify = new Spotify(keys.spotifyKeys);
        spotify.search({ type: "track", query: song + "", limit: 1}, function(err,response, info) {
            if (err) {
                console.log("Error occured: " + err);
                return;
            }else {
                var info = JSON.parse(JSON.stringify(response)).tracks.items[0];
                // <<<<<<<<artists>>>>>>>>
                console.log("Artist: " + info.artists[0].name);
                // <<<<<<<<title>>>>>>>>>
                console.log("Title: " + info.name);
                // <<<<<<<<album>>>>>>>>>
                console.log("Album: " + info.album.name);
                // <<<<<<<<link>>>>>>>>
                console.log("Here's a link: " + info.external_urls.spotify);
            };
        });
    };

};