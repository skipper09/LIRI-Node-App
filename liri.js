var keys = require("./keys.js"),
    Twitter = require('twitter'),
    Spotify = require('node-spotify-api'),
    request = require('request'),
    fs = require("fs"),
    twitterKeys = keys.twitterKeys,
    spotifyKeys = keys.spotifyKeys,
    userInput = process.argv[2],
    userSearch = process.argv[3],
    client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
    }),
    spotify = new Spotify({
        id: keys.spotifyKeys.client_id,
        secret: keys.spotifyKeys.client_secret
    });

function runProgram() {

    if (userInput === "my-tweets") {

        var params = { screen_name: 'skipper091' };
        client.get('statuses/user_timeline', params, function(error, tweets, response) {
            if (!error) {
                for (key in tweets) {
                    console.log("\n" + tweets[key].text + "\n" + "   " + tweets[key].created_at + "\n" + "--------------------");
                }
            }
        });

    } else if (userInput === "spotify-this-song") {

        if (userSearch == undefined) {
            userSearch = "The Ace"
        }

        spotify.search({ type: 'track', query: userSearch, limit: 1 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var artist = data.tracks.items[0].album.artists[0].name;
            var songName = data.tracks.items[0].name;
            var link = data.tracks.items[0].preview_url;
            var album = data.tracks.items[0].album.name;

            console.log("\n Artist: " + artist + "\n Song: " + songName + "\n Link: " + link + "\n Album: " + album + "\n");

        });

    } else if (userInput === "movie-this") {

        if (userSearch == undefined) {
            userSearch = "Mr Nobody"
        }

        request('http://www.omdbapi.com/?t=' + userSearch + '&y=&plot=short&apikey=40e9cece', function(error, response, body) {
            if (error) {
                return console.log(err)
            }

            var movieData = JSON.parse(body),
                title = movieData.Title,
                year = movieData.Year,
                IMDBrating = movieData.Ratings[0].Value,
                RTrating = movieData.Ratings[1].Value,
                plot = movieData.Plot,
                actors = movieData.Actors,
                country = movieData.Country,
                language = movieData.Language;

            console.log(`\n Title: ${title} \n Year: ${year} \n IMDB Rating: ${IMDBrating} \n Rotten Tomatoes Rating: ${RTrating} \n Plot: ${plot} \n Actors: ${actors} \n Country: ${country} \n Language: ${language} \n`)
        });
    };
}

if (userInput === "do-what-it-says") {

    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");

        userInput = dataArr[0];
        userSearch = dataArr[1];

        runProgram();

    });
};

runProgram();
