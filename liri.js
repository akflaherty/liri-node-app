var command = process.argv[2];
var input = process.argv[3];

switch(command) {
	case 'my-tweets':
		console.log('TWEETS');
		tweetFunc();
		break
	case 'spotify-this-song':
		console.log('SPOTIFY');
		spotifyFunc(input);
		break
	case 'movie-this':
		console.log('MOVIE');
		movieFunc(input);
		break
	case 'do-what-it-says':
		console.log('what it says');
		whatItSaysFunc();
	default:
		console.log('ERROR: bad command');
}

function tweetFunc() {
	console.log('tweet function');
}

function spotifyFunc(val) {
	console.log('spotify function');
	if (!val) {
		// default value
		val = 'The Sign'
	}
}

function movieFunc(val) {
	console.log('movie function');
	if (!val) {
		// default value
		val = 'Mr.+Nobody';
	}
}

function whatItSaysFunc() {
	console.log('doing what it says');
}