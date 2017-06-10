

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
		if (r.total_results >= 1) {
			console.log(r.results[0]);
			// saves results in searchObject.results
			searchObject.results = r.results[0];
			// adds head to profile_path
			searchObject.results.profile_path = 
			'https://image.tmdb.org/t/p/w300' + searchObject.results.profile_path;
			// checks search history again using retrieved results to avoid rewriting the
			// same data to firebase, sending retrieved name as argument instead of query term
			if (!wasSearchedBefore(searchObject.results.name, 'person')) {
				// calls the next ajax function, sends object as an argument
				actorInfo(searchObject, searchKey);
			} //recycles old search data
			else {reuseSearchData(searchObject.results.name, 'person');}
		}
		else{
			// Materialize.toast(message, displayLength, className, completeCallback);
  			Materialize.toast('Sorry, your search didnt yield any results.', 4000);
		}
	});
} // end of searchTMDBbyPerson()

function actorInfo(searchObject, searchKey) {
	var tmdbApiKey = "82f6be9756f8de0b7738603a7b3fab34";
	var actorID = searchObject.results.id;
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://api.themoviedb.org/3/person/"+ actorID +"?append_to_response=tagged_images&language=en-US&api_key=" + tmdbApiKey,
	  "method": "GET",
	  "headers": {},
	  "data": "{}"
	};

	$.ajax(settings).done(function (response) {
	  console.log(response);
	  	searchObject.results.details = response;

		// writes search results to firebase
		writeSearchData(searchObject, searchKey);

		// calls function which listens for firebase uploading to finish 
		// before redirecting to 'search.html'
		afterLoadRedirectTo(searchObject, 'search.html');
	});
} // end of actorInfo()

function displayPopular () {
	var settings = {
	  "async": true,
	  "crossDomain": true,
	  "url": "https://api.themoviedb.org/3/movie/popular?page=1&language=en-US&api_key=82f6be9756f8de0b7738603a7b3fab34",
	  "method": "GET",
	  "headers": {},
	  "data": "{}"
	};

	$.ajax(settings).done(function (response) {
	  for (i = 0; i < response.results.length; i++) {
	  	var li = $("<li>");
	  	var img = $("<img>");
	  	var div = $("<div>");
	  	var h3 = $("<h3>");
	  	var c = Math.floor(Math.random() * 3);
	  	var captions = ["center-align", "left-align", "right-align"];
	  	$("#backgrounds").append(li);
	  	li.append(img)	  	
	  	   .attr("data-type", "movie")
	  	   .attr("data-name", response.results[i].title)	  	   
	  	   .addClass("link");
	  	img.attr("src", "https://image.tmdb.org/t/p/w1280" + response.results[i].backdrop_path)
	  	   .attr("alt", response.results[i].title);
	  	li.append(div);	  	
	  	div.addClass("caption " + captions[c]);
	  	div.append(h3);
	  	h3.text(response.results[i].title);
	  } // end of for loop
	  $('.slider').slider({indicators: false});
	}); // end of promise
}

// function for querying the omdb API using ajax
function searchOMDBbyMovie(searchObject, searchKey) {

	var omdbApiKey = 'd20f646e';

	// query URL for OMDB API
	var queryURL = 'https://www.omdbapi.com/?apikey=' + omdbApiKey 
				+ '&t=' + searchObject.query;

	// AJAX request
	$.ajax({
		method: "GET",
		url: queryURL
	}).done(function(r){
		console.log(r);
		if (r.Response !== "False") {
			// saves results in searchObject.results
			searchObject.results = r;
			// checks search history again using retrieved results to avoid rewriting the
			// same data to firebase, sending retrieved title as argument instead of query term
			if (!wasSearchedBefore(searchObject.results.Title, 'movie')) {
				// writes search results to firebase
				writeSearchData(searchObject, searchKey);

				// calls function which listens for firebase uploading to finish 
				// before redirecting to 'search.html'
				afterLoadRedirectTo(searchObject, 'search.html');
			} //recycles old search data
			else {reuseSearchData(searchObject.results.Title, 'movie');}
				
		} 
		else{
			// Materialize.toast(message, displayLength, className, completeCallback);
  			Materialize.toast('Sorry, your search didnt yield any results.', 4000);
		}
	});
}