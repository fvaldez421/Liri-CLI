var inquirer = require("inquirer");
var fs = require("fs");
var showTweets = require("./gameFiles/twitter");
var spotSong = require("./gameFiles/spotify");
var selMov = require("./gameFiles/movie");

function runLiri() {
	inquirer.prompt([ // Prompts user for a command and calls on requested function
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
					var comArr = JSON.parse(data).split(", "); // creates array from string of random commands
					var t = comArr.indexOf("tweets");
					var s = comArr.indexOf("spotify");
					var m = comArr.indexOf("movie");
					var indexArr = [t, s, m]; // array of command indices 
					var n = Math.floor((Math.random() * 3) + 1); // random number from (1-3 for the switch case)

					switch (n) {
						case 1:
							showTweets();
						break;
						case 2:
							var ranSong = comArr[s + 1]; // Provides preditermined song from random.txt
							spotSong(ranSong);
						break;
						case 3:
							var ranMov = comArr[m + 1]; // Provides random movie 
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






