


function searchTMDBbyMovie(queryTerm) {

	var tmdbApiKey = '82f6be9756f8de0b7738603a7b3fab34';

	// query URL for the TMDB API
	var queryURL = 'https://api.themoviedb.org/3/search/movie?api_key=' + tmdbApiKey 
				+ '&query=' + queryTerm;

	// AJAX request
	$.ajax({
		method: "GET",
		url: queryURL
	}).done(function(r){
		console.log(r);
	});
}

