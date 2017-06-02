

// old function for tmbd api key
function searchTMDBbyPerson(queryTerm) {

	var tmdbApiKey = '82f6be9756f8de0b7738603a7b3fab34';

	// query URL for the TMDB API
	var queryURL = 'https://api.themoviedb.org/3/search/person?api_key=' + tmdbApiKey 
				+ '&language==en-US&query=' + queryTerm + '&page=1&include_adult=false';

	// AJAX request
	$.ajax({
		method: "GET",
		url: queryURL
	}).done(function(r){
		console.log(r);
	});
}

// function for querying the omdb API using ajax
function searchOMDBbyMovie(queryTerm) {

	var omdbApiKey = 'd20f646e';

	// query URL for OMDB API
	var queryURL = 'http://www.omdbapi.com/?apikey=' + omdbApiKey 
				+ '&t=' + queryTerm;

	// AJAX request
	$.ajax({
		method: "GET",
		url: queryURL
	}).done(function(r){
		console.log(r);
	});
}