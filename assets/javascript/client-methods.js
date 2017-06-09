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

function isSearchInputValid(query) {
	if (query == '' || query == null) {
		return false;
	}
	if (query != '' && query != null) {
		return true;
	}
}

function getCarouselItem(result, resultType){
	var item = $('<a>');

	item.addClass('carousel-item') // carouselIndex is a global variable (see database-mng.js)
		.attr('href', '#' + carouselIndex + '!');

	var img = $('<img>');

	if (resultType === 'movie') {
		img.attr('src', result.Poster)
			.attr('alt', result.Title)
			.attr('data-type', resultType)
			.attr('data-name', result.Title)
			.addClass('link')
			.appendTo(item);
	}
	if (resultType === 'person') {
		img.attr('src', result.profile_path)
			.attr('alt', result.name)
			.attr('data-type', resultType)
			.attr('data-name', result.name)
			.addClass('link')
			.appendTo(item);
	}
	 return item;
}

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






