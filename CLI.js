
var keys = require("./keys.js");
var inquirer = require("inquirer");

var showTweets = require("./gameFiles/twitter");
var spotSong = require("./gameFiles/spotify");
var selMov = require("./gameFiles/movie");

var fs = require("fs");


function runLiri() {
	inquirer.prompt([
		{
			type: "list",
			message: "Give me a command",
			choices: ['tweets', 'spotify', 'movie', 'random', 'exit'],
			name: "command"
		},
		]).then(function(response) {
			var command = response.command;

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

		function randComm() {
			fs.readFile("random.txt", "utf8", function(error, data) {
				if (error) {
					console.log("error");
				}else {
					var indexArr = [];
					var comArr = JSON.parse(data).split(", ");
					var t = comArr.indexOf("tweets");
					var s = comArr.indexOf("spotify");
					var m = comArr.indexOf("movie");

					indexArr.push(t, s, m);

					var n = Math.floor((Math.random() * 3) + 1);

					switch (n) {
						case 1:
						showTweets();
						break;

						case 2:
						var ranSong = comArr[s + 1];
						spotSong(ranSong);
						break;

						case 3:
						var ranMov = comArr[m + 1];
						selMov(ranMov);
						break;
					};
				};
			});
		};
		function exitApp() {
			console.log("GoodBye!")
		}
	});
}

runLiri();






