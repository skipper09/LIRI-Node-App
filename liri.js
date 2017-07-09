var keys = require("./keys.js"),
    Twitter = require('twitter'),
    Spotify = require('node-spotify-api'),
    twitterKeys = keys.twitterKeys,
    spotifyKeys = keys.spotifyKeys,
    userInput = process.argv[2],
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

    var songName = process.argv[3];

    if (process.argv[3] == undefined) {

        spotify.search({ type: 'track', query: "The Ace", limit: 1 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var artist = data.tracks.items[0].album.artists[0].name;
            var songName = data.tracks.items[0].name;
            var link = data.tracks.items[0].preview_url;
            var album = data.tracks.items[0].album.name;

            console.log("\n Artist: " + artist + "\n Song: " + songName + "\n Link: " + link + "\n Album: " + album + "\n")

        });

    } else {


        spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var artist = data.tracks.items[0].album.artists[0].name;
            var songName = data.tracks.items[0].name;
            var link = data.tracks.items[0].preview_url;
            var album = data.tracks.items[0].album.name;

            console.log("\n Artist: " + artist + "\n Song: " + songName + "\n Link: " + link + "\n Album: " + album + "\n");

        });
    }

} else if (userInput === "movie-this") {

} else if (userInput === "do-what-it-says") {

};
