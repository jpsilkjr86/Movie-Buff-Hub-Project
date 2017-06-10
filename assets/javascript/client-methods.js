// function to set user key in local storage
function setUserKey(keyArg) {
	localStorage.setItem('User Key', keyArg);
}

// function to get the user key, either retrieved from local storage or generated from firebase
function getUserKey() {
	// sets a key variable initially as an empty string
	var k = '';

	// if local storage 'User Key' key is empty
	if (localStorage.getItem('User Key') == null) {
		// generates a key from firebase and sets k equal to it
		k = generateFirebaseUserKey();
		// sets the new key in local storage
		setUserKey(k);
	}
	// if local storage 'User Key' key is not empty, sets k equal to its value.
	else {k = localStorage.getItem('User Key');}

	// always returns the key at the end of the function
	console.log('User Key:', k);
	return k;
}

// function for creating a movie-suggestion div
// arguments: title, img url path, year released
// returns the finished div
function getMovieSuggestionDiv (title, imgURL, year){
	var div = $('<div>');

	div.addClass('movie-suggestion');

	var poster = $('<img>');

	poster.addClass('center-block poster')
		.attr('src', imgURL)
		.appendTo(div);

	var p = $('<p>');

	p.text(title + ' (' + year + ')') 
	 .addClass('text-center')
	 .appendTo(div);

	 return div;
}

// similar to getMovieSuggestionDiv but with person profile
function getPersonSuggestionDiv (name, imgURL) {
	var div = $('<div>');

	div.addClass('person-suggestion');

	var profile = $('<img>');

	profile.addClass('center-block profile')
		.attr('src', imgURL)
		.appendTo(div);

	var p = $('<p>');

	p.text(name) 
	 .addClass('text-center')
	 .appendTo(div);

	 return div;
}

// checks to see if a search input is null or an empty string
function isSearchInputEmpty(query) {
	if (query == '' || query == null) {return true;}
	if (query != '' && query != null) {return false;}
}

// checks to see if a query was searched before
function wasSearchedBefore(queryArg, queryType) {
	if (queryType ==='movie') {
		for (var i = 0; i < allUserSearches.length; i++) {
			if (queryArg === allUserSearches[i].query || queryArg === allUserSearches[i].results.Title) {
				return true;
			}
		}
		return false;
	}
	if (queryType ==='person') {
		for (var i = 0; i < allUserSearches.length; i++) {
			if (queryArg === allUserSearches[i].query || queryArg === allUserSearches[i].results.name) {
				return true;
			}
		}
		return false;
	}	
}

// gets search data from search history in allUserSearches
function getSearchDataFromHistory(query, queryType){
	if (queryType ==='movie') {
		for (var i = 0; i < allUserSearches.length; i++) {
			if (query === allUserSearches[i].query || query === allUserSearches[i].results.Title) {
				return allUserSearches[i];
			}
		}
	}
	if (queryType ==='person') {
		for (var i = 0; i < allUserSearches.length; i++) {
			if (query === allUserSearches[i].query || query === allUserSearches[i].results.name) {
				return allUserSearches[i];
			}
		}
	}
}

function getCarouselItem(result, resultType){
	var item = $('<a>');

	item.addClass('carousel-item') // carouselIndex is a global variable (see database-mng.js)
		.attr('href', '#' + carouselIndex + '!');

	var img = $('<img>');

	if (resultType === 'movie') {
		// the normal click event handler wouldn't work for the carousel (probably has
		// to do with the carousel() in-built functionality in materialize framework,
		// but it works when i  attach it direclty to the DOM element itself via onclick
		// attribute. see carouselClickHandler() below for more details.
		// note: click event doesn't work on mobile devices - others on github forum having same issue.
		item.attr("onclick", "carouselClickHandler('" + result.Title + "', 'movie')")
			.attr("data-name", result.Title)
			.attr("data-type", "movie");
		img.attr('src', result.Poster)
			.attr('alt', result.Title)
			// .addClass('link')
			.appendTo(item);
	}
	if (resultType === 'person') {
		item.attr("onclick", "carouselClickHandler('" + result.name + "', 'person')")
			.attr("data-name", result.name)
			.attr("data-type", "person");
		img.attr('src', result.profile_path)
			.attr('alt', result.name)
			// .addClass('link')
			.appendTo(item);
	}
	 return item;
}

function carouselClickHandler(query, queryType) {
	if (!wasSearchedBefore(query, queryType)) {
		// gets a database key (unique id) for logging this search entry to firebase
		var searchKey = generateFirebaseSearchKey();

		// conditions for calling ajax requests
		if (queryType === 'movie') {
			// creates a searchObject for the new query
			var searchObject = new searchDataObject(query, 'movie', searchKey);
			// sends searchObject and searchKey as arguments for the ajax request
			searchOMDBbyMovie(searchObject, searchKey);
		}
		if (queryType === 'person') {
			// creates a searchObject for the new query
			var searchObject = new searchDataObject(query, 'person', searchKey);
			// sends searchObject and searchKey as arguments for the ajax request
			searchTMDBbyPerson(searchObject, searchKey);
		}
	} else { // i.e. if query was already searched before
		reuseSearchData(query, queryType);		
	}
} // end of carouselClickHandler()

function getSmallMovieCard(result) {
	
	var column = $('<div class="col s12 m6 xl4">')
	
	var card = $('<div class="card horizontal blue-grey darken-4">');

	var cardImage = $('<div class="card-image">');
	var poster = $('<img>');
	poster.attr('src', result.Poster)
		.attr('alt', result.Title + ' Poster')
		.addClass('small-poster')
		.appendTo(cardImage);

	var cardStacked = $('<div class="card-stacked">');

	var cardContent = $('<div class="card-content">');

	var title = $('<h6>');
	title.text(result.Title + ' (' + result.Year + ')')
		.appendTo(cardContent);
	var subTitle = $('<p>');
	subTitle.html('Director: ' + result.Director)
			.appendTo(cardContent);

	var cardAction = $('<div class="card-action">');
	var link = $('<a href="#">');
	link.text('Learn More')
		.addClass('link') // for click event listener
		.attr('data-name', result.Title) // data for ajax request
		.attr('data-type', 'movie') // data for ajax request
		.appendTo(cardAction);

	cardStacked.append(cardContent)
			.append(cardAction);

	card.append(cardImage)
		// .append(cardContent);
		.append(cardStacked);

	column.append(card);

	return column;
}

function getSmallPersonCard(result) {
	
	var column = $('<div class="col s12 m6 xl4">')
	
	var card = $('<div class="card horizontal blue-grey darken-4">');

	var cardImage = $('<div class="card-image">');
	var poster = $('<img>');
	poster.attr('src', result.profile_path)
		.attr('alt', result.name + ' Profile')
		.addClass('small-profile')
		.appendTo(cardImage);

	var cardStacked = $('<div class="card-stacked">');

	var cardContent = $('<div class="card-content">');

	var personName = $('<h6>');
	personName.text(result.name)
		.appendTo(cardContent);
	var subTitle = $('<p>');
	subTitle.html('Known for:<br><cite>' 
				+ result.known_for[0].original_title
				+ '</cite>')
			.appendTo(cardContent);

	var cardAction = $('<div class="card-action">');
	var link = $('<a href="#">');
	link.text('Learn More')
		.addClass('link') // for click event listener
		.attr('data-name', result.name) // data for ajax request
		.attr('data-type', 'person') // data for ajax request
		.appendTo(cardAction);

	cardStacked.append(cardContent)
			.append(cardAction);

	card.append(cardImage)
		// .append(cardContent);
		.append(cardStacked);

	column.append(card);

	return column;
}
