var inquirer = require("inquirer");
var request = require("request");
var keys = require("./../keys.js");

module.exports = function(ranMov) {
    if (!ranMov) { // If random movie is NOT provided (undefined), pompts user for a movie
        function getMov() {
            inquirer.prompt([
                {
                    type: "input",
                    message: "What movie? (Please use correct punctuation):",
                    name: "userMovie"
                }
            ]).then(function(input) {
                movie = input.userMovie;
                if (input.userMovie === "") {
                    movie = "The Terminator";
                };
                searchMov();
            });
        }
        getMov()
    }else if (ranMov) { // if random movie IS provided, movie variable = ranMov
        movie = ranMov;
        searchMov();
    }
    function searchMov() { // makes call and prints information, has some error handling such as movie not found or 200 status code
        var apiKey = keys.omdbKey;
        var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&apikey=" + apiKey;
        request(queryUrl, function(error, response, body) {
            var info = JSON.parse(JSON.parse(JSON.stringify(response["body"])));

            if (error || response.statusCode != 200) {
                console.log(error);
            }else if (info.Title === undefined) {
                console.log(info.Error + "\n")
                getMov();
            }else {
                // <<<<<<<<title>>>>>>>>
                console.log("\n------------------------------------------------");
                console.log("Title: " + info.Title);
                console.log("------------------------------------------------");
                // <<<<<<<<<Release Year>>>>>>>
                console.log("Year Released: " + info.Year);
                console.log("------------------------------------------------");
                // <<<<<<<<<IMDB Rating>>>>>>>>
                console.log("IMDB Rating: " + (info.Ratings ? info.Ratings[0].Value : "N/A"));
                console.log("------------------------------------------------");
                // <<<<<<<<<Rotten Tomatoes>>>>>>>
                console.log("Rotten Tomatoes: " + (info.Ratings 
                                                    ? [(info.Ratings[1] ? info.Ratings[1].Value : "N/A")] : "N/A"));
                console.log("------------------------------------------------");
                // <<<<<<<<<Country>>>>>>>>>>
                console.log("Country Produced: " + info.Country);
                console.log("------------------------------------------------");
                // <<<<<<<<<<<Language>>>>>>>>>>>
                console.log("Language: " + info.Language);
                console.log("------------------------------------------------");
                // <<<<<<<<<<<Plot>>>>>>>>>>>>
                console.log("Plot: " + (info.Plot ? info.Plot : "N/A"));
                console.log("------------------------------------------------");
                // <<<<<<<<<<<Actors>>>>>>>>>
                console.log("Actors: " + info.Actors);
                console.log("------------------------------------------------");
            };
        });
    }
};