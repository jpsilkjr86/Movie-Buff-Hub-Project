

// function for querying tmbd api by person (actor, actress etc)
function searchTMDBbyPerson(searchObject, searchKey) {

	var tmdbApiKey = '82f6be9756f8de0b7738603a7b3fab34';

	// query URL for the TMDB API
	var queryURL = 'https://api.themoviedb.org/3/search/person?api_key=' + tmdbApiKey 
				+ '&language==en-US&query=' + searchObject.query + '&page=1&include_adult=false';

	// AJAX request
	$.ajax({
		method: "GET",
		url: queryURL
	}).done(function(r){
		if (r.results[0] != null) {
			console.log(r.results[0]);
			// saves results in searchObject.searchResults
			searchObject.searchResults = r.results[0];
			// adds head to profile_path
			searchObject.searchResults.profile_path = 
			'https://image.tmdb.org/t/p/w300' + searchObject.searchResults.profile_path;
			// is this the head path to the profile_path image url? https://image.tmdb.org/t/p/w300/
			// writes search results to firebase
			writeSearchData(searchObject, searchKey);
		}
	});
}

// function for querying the omdb API using ajax
function searchOMDBbyMovie(searchObject, searchKey) {

	var omdbApiKey = 'd20f646e';

	// query URL for OMDB API
	var queryURL = 'http://www.omdbapi.com/?apikey=' + omdbApiKey 
				+ '&t=' + searchObject.query;

	// AJAX request
	$.ajax({
		method: "GET",
		url: queryURL
	}).done(function(r){
		if (r != null) {
			console.log(r);
			// saves results in searchObject.searchResults
			searchObject.searchResults = r;
			// writes search results to firebase
			writeSearchData(searchObject, searchKey);
		}
	});
}