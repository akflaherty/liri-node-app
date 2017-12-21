// request npm
var request = require('request');

// spotify npm
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: '38939a5298534c479ebb601a50454b05',
    secret: '38cda4cf33d94335837159711b544fd7'
});

// twitter npm example
// var Twitter = require('twitter');

// var client = new Twitter({
//   consumer_key: '',
//   consumer_secret: '',
//   access_token_key: '',
//   access_token_secret: ''
// });

// var params = {screen_name: 'nodejs'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//   }
// });

// take user's inputs
var command = process.argv[2];
var input = process.argv[3];

// construct a single input
for (var i = 4; i < process.argv.length; i++) {
    input = input + ' ' + process.argv[i];
}

console.log('');
switch (command) {
    case 'my-tweets':
        console.log('TWEETS');
        tweetFunc();
        break

    case 'spotify-this-song':
        // console.log('SPOTIFY');
        spotifyFunc(input);
        break

    case 'movie-this':
        // console.log('MOVIE');
        movieFunc(input);
        break

    case 'do-what-it-says':
        console.log('what it says');
        whatItSaysFunc();

    default:
        console.log('ERROR: unrecognized command');
}

function tweetFunc() {
    console.log('tweet function');
}

function spotifyFunc(val) {
    spotify.search({
        type: 'track',
        query: 'All the Small Things'
    }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var track = data.tracks.items[0]
        // console.log(data.tracks.items[0]);
        // Artist(s)
        console.log('Artist: ', track.artists[0].name);
        // The song's name
        console.log('Name: ', track.name);
        // A preview link of the song from Spotify
        console.log('Preview: ', track.href);
        // The album that the song is from
        console.log('Album: ', track.album.name);
    });
}

function movieFunc(val) {
    if (!val) {
        // default value
        val = 'Mr.+Nobody';
    }
    // console.log('movie function', val);
    var queryUrl = "http://www.omdbapi.com/?t=" + val + "&y=&plot=short&apikey=40e9cece";

    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            // console.log(JSON.stringify(response, null, 2));
            var data = JSON.parse(body);
            // log data
            // * Title of the movie.
            console.log('Title: ', data.Title);
            // * Year the movie came out.
            console.log('Year: ', data.Year);
            // * IMDB Rating of the movie.
            console.log('IMDB Rating: ', data.imdbRating);
            // * Rotten Tomatoes Rating of the movie.
            console.log('Rotten Tomatoes Rating: ', data.Ratings[1].Value);
            // * Country where the movie was produced.
            console.log('Countries: ', data.Country);
            // * Language of the movie.
            console.log('Language: ', data.Language);
            // * Plot of the movie.
            console.log('Plot: ');
            console.log(data.Plot);
            // * Actors in the movie.
            console.log('Actors: ', data.Actors);
        }
    })
}

function whatItSaysFunc() {
    console.log('doing what it says');
}