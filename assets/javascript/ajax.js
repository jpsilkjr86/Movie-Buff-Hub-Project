

// function for querying tmbd api by person (actor, actress etc)
function searchTMDBbyPerson(queryTerm, searchKey) {

	var tmdbApiKey = '82f6be9756f8de0b7738603a7b3fab34';

	// query URL for the TMDB API
	var queryURL = 'https://api.themoviedb.org/3/search/person?api_key=' + tmdbApiKey 
				+ '&language==en-US&query=' + queryTerm + '&page=1&include_adult=false';

	// AJAX request
	$.ajax({
		method: "GET",
		url: queryURL
	}).done(function(r){
		console.log(r.results[0]);

		var searchResultsData = r.results[0];
		var userKey = getUserKey();

		// writes search results object to firebase 'allsearches' directory,
		// reference depends on searchKey argument
		database.ref('allsearches/' + searchKey).child('searchResults').set(searchResultsData);

		// writes search results object to firebase 'usersearches' directory,
		// reference depends on searchKey argument and userKey
		database.ref('usersearches/' + userKey + '/' + searchKey).child('searchResults').set(searchResultsData);
	});
}

// function for querying the omdb API using ajax
function searchOMDBbyMovie(queryTerm, searchKey) {

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

		var searchResultsData = r;
		var userKey = getUserKey();

		// writes search results object to firebase 'allsearches' directory,
		// reference depends on searchKey argument
		database.ref('allsearches/' + searchKey).child('searchResults').set(searchResultsData);

		// writes search results object to firebase 'usersearches' directory,
		// reference depends on searchKey argument and userKey
		database.ref('usersearches/' + userKey + '/' + searchKey).child('searchResults').set(searchResultsData);		
	});
}