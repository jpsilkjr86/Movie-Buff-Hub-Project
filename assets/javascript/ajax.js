

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
		if (r.results[0] != null) {
			console.log(r.results[0]);

			var searchResultsData = r.results[0];
			var userKey = getUserKey();

			// writes search results object to firebase 'allsearches' directory,
			// reference depends on searchKey argument
			database.ref('allsearches/' + searchKey).child('searchResults').set(searchResultsData);

			// writes search results object to firebase 'usersearches' directory,
			// reference depends on searchKey argument and userKey
			database.ref('usersearches/' + userKey + '/' + searchKey).child('searchResults').set(searchResultsData);
		}
	});
}

function displayPopular () {
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=82f6be9756f8de0b7738603a7b3fab34",
	  "method": "GET",
	  "headers": {},
	  "data": "{}"
	}

	$.ajax(settings).done(function (response) {
	  for (i = 0; i < response.results.length; i++) {
	  	var li = $("<li>");
	  	var img = $("<img>");
	  	var div = $("<div>");
	  	var h3 = $("<h3>");
	  	var c = Math.floor(Math.random() * 3);
	  	var captions = ["center-align", "left-align", "right-align"];
	  	$("#backgrounds").append(li);
	  	li.append(img);
	  	img.attr("src", "https://image.tmdb.org/t/p/w1280" + response.results[i].backdrop_path);
	  	li.append(div);
	  	
	  	div.addClass("caption " + captions[c]);
	  	div.append(h3)
	  	h3.text(response.results[i].title);
	  }
	  $('.slider').slider({indicators: false});
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
		if (r != null) {
			console.log(r);

			var searchResultsData = r;
			var userKey = getUserKey();

			// writes search results object to firebase 'allsearches' directory,
			// reference depends on searchKey argument
			database.ref('allsearches/' + searchKey).child('searchResults').set(searchResultsData);

			// writes search results object to firebase 'usersearches' directory,
			// reference depends on searchKey argument and userKey
			database.ref('usersearches/' + userKey + '/' + searchKey).child('searchResults').set(searchResultsData);		
		}
	});
}