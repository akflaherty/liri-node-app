// request npm
var request = require('request');

// twitter npm
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: '9msOsaFWsBMSTDL5ye3dFzeks',
    consumer_secret: '6ufp1p88plzzsS80ze9WDWcLcebZjz9pfTuLr5GP6FU0Bt050q',
    access_token_key: '943734155686400000-jgmD8Td440ACltqcyRkKr1RhNknx9kh',
    access_token_secret: 'C9PKXuqP9HYMTd4LLfSGFyh0ydEinVXgopoa1ipFPCUje'
});

var tab = '    '; // added to improve format

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
        tweetFunc();
        break

    case 'spotify-this-song':
        spotifyFunc(input);
        break

    case 'movie-this':
        movieFunc(input);
        break

    case 'do-what-it-says':
        console.log('what it says');
        whatItSaysFunc();

    default:
        console.log('ERROR: unrecognized command');
}

function tweetFunc() {
    // console.log('tweet function');
    var params = {
        screen_name: 'wasabi_badger'
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < Math.min(tweets.length, 20); i++) {
                console.log('Created: ', tweets[i].user.created_at);
                console.log('Text: ');
                console.log(tweets[i].text);
                console.log('');
            }
        } else {
            return console.log(error);
        }
    });
}

function spotifyFunc(val) {
    if (!val) {
        // default value
        val = 'All the Small Things';
    }

    // spotify npm
    var Spotify = require('node-spotify-api');

    var spotify = new Spotify({
        id: '38939a5298534c479ebb601a50454b05',
        secret: '38cda4cf33d94335837159711b544fd7'
    });


    spotify.search({
        type: 'track',
        query: val
    }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var track = data.tracks.items[0]
            // log data
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
            console.log('Title: ');
            console.log(tab + data.Title);
            // * Year the movie came out.
            console.log('Year: ')
            console.log(tab + data.Year);
            // * IMDB Rating of the movie.
            console.log('IMDB Rating: ')
            console.log(tab + data.imdbRating);
            // * Rotten Tomatoes Rating of the movie.
            console.log('Rotten Tomatoes Rating: ')
            console.log(tab + data.Ratings[1].Value);
            // * Country where the movie was produced.
            console.log('Countries: ')
            console.log(tab + data.Country);
            // * Language of the movie.
            console.log('Language: ')
            console.log(tab + data.Language);
            // * Actors in the movie.
            console.log('Actors: ')
            console.log(tab + data.Actors);
            // * Plot of the movie.
            console.log('Plot: ');
            console.log(tab + data.Plot);

        }
    })
}

function whatItSaysFunc() {
    console.log('doing what it says');
}