
var keys = require("./keys.js");
var twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var inquirer = require("inquirer");
var fs = require("fs");
var song;
var movie;
var comArr;
var indexArr = [];
var t;
var s;
var m;
var ranSpot = false;
var ranMov = false;

function runLiri() {
	inquirer.prompt([
		{
			type: "input",
			message: "Enter a command: \n------------------ \n'tweets' for tweets \n'spotify' to search for a song \n'movie' to search for a movie \n'random' for a random \n",
			name: "command"
		},
		]).then(function(response) {
			var command = response.command;
			console.log("command: " + command);

		switch (response.command) {
			case "tweets":
			showTweets();
			break;

			case "spotify":
			spotSong();
			break;

			case "movie":
			selMov();
			break;

			case "random":
			randComm();
			break;

			case "exit":
			exitApp();
			break;
		};

		function showTweets() {
			var client = new twitter(keys.twitterKeys);
			var params = {screen_name: "manbearpig_5"};

			client.get("statuses/user_timeline", params, function(error, tweets, response) {
				if (!error) {
					for (i = 0; i < 21; i++) {
						console.log(tweets[i].text);				}
				}else {
					throw JSON.stringify(error);
				};
			});
		};

		function spotSong() {
			if (!ranSpot) {
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
			} else if (ranSpot) {
				song = comArr[s + 1];
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

		function selMov() {
			if (!ranMov) {
				inquirer.prompt([
					{
						type: "input",
						message: "What movie?",
						name: "userMovie"
					},
				]).then(function(input) {
					movie = input.userMovie;
					console.log("should be blank: " + movie);
					if (input.userMovie === "") {
						movie = "The Terminator";
					};
					searchMov();
				});
			}else if (ranMov) {
				movie = comArr[m + 1];
				searchMov();
			}
			function searchMov() {
				var apiKey = keys.omdbKey;
				var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=" + apiKey;
				request(queryUrl, function(error, response, body) {
					if (error || response.statusCode != 200) {
						console.log(error);
					}else {

						var info = JSON.parse(JSON.parse(JSON.stringify(response["body"])));
						// <<<<<<<<title>>>>>>>>
						console.log("\n------------------------------------------------");
						console.log("Title: " + info.Title);
						console.log("------------------------------------------------");
						// <<<<<<<<<Release Year>>>>>>>
						console.log("Year Released: " + info.Year);
						console.log("------------------------------------------------");
						// <<<<<<<<<IMDB Rating>>>>>>>>
						console.log("IMDB Rating: " + info.Ratings[0].Value);
						console.log("------------------------------------------------");
						// <<<<<<<<<Rotten Tomatoes>>>>>>>
						console.log("Rotten Tomatoes: " + info.Ratings[1].Value);
						console.log("------------------------------------------------");
						// <<<<<<<<<Country>>>>>>>>>>
						console.log("Country Produced: " + info.Country);
						console.log("------------------------------------------------");
						// <<<<<<<<<<<Language>>>>>>>>>>>
						console.log("Language: " + info.Language);
						console.log("------------------------------------------------");
						// <<<<<<<<<<<Plot>>>>>>>>>>>>
						console.log("Plot: " + info.Plot);
						console.log("------------------------------------------------");
						// <<<<<<<<<<<Actors>>>>>>>>>
						console.log("Actors: " + info.Actors);
						console.log("------------------------------------------------");
					};
				});
			}
		};

		function randComm() {
			fs.readFile("random.txt", "utf8", function(error, data) {
				if (error) {
					console.log("error");
				}else {
					comArr = JSON.parse(data).split(", ");

					t = comArr.indexOf("tweets");
					s = comArr.indexOf("spotify");
					m = comArr.indexOf("movie");

					indexArr.push(t, s, m);

					var n = Math.floor((Math.random() * 3) + 1);
					console.log(n);

					switch (n) {
						case 1:
						showTweets();
						break;

						case 2:
						ranSpot = true;
						spotSong();
						break;

						case 3:
						ranMov = true;
						selMov();
						break;
					};
				};
			});
		};

	});
}

runLiri();







