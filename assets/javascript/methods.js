// function to get a user key (unique id) by generating one on firebase
function generateFirebaseUserKey() {
	var userRef = firebase.database().ref('usersearches');
	var gotKey = userRef.push().key;
	gotKey = 'user_' + gotKey; // adds 'user_' to the beginning of the string
	return gotKey;
}

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

// function to get a key (unique id) for a search entry by generating one on firebase
function generateFirebaseSearchKey() {
	var searchesRef = firebase.database().ref('allsearches');
	var gotKey = searchesRef.push().key;
	gotKey = 'search_' + gotKey; // adds 'user_' to the beginning of the string
	return gotKey;
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

// object constructur that returns a search data object. some of the data object's
// properties will be updated after the ajax request is complete.
function searchDataObject(query, queryType) {
	this.query = query;
	this.queryType = queryType;
	this.id = getUserKey();
	this.timestamp = 0;
	this.results = {};
}

// function to write search entry data to both 'allusers' and 'usersearches' firebase directories
function writeSearchData(searchObject, searchKey) {
	// saves timestamp
	searchObject.timestamp = firebase.database.ServerValue.TIMESTAMP;
	// writes same data to two separate references in firebase
	database.ref('allsearches/' + searchKey).set(searchObject);
	database.ref('usersearches/' + searchObject.id + '/' + searchKey).set(searchObject);
}

function getCarouselItem(imgURL){
	var item = $('<a>');

	item.addClass('carousel-item')
		.attr('href', '#' + getCarouselIndex() + '!');

	var poster = $('<img>');

	poster.attr('src', imgURL)
		.appendTo(item);

	 return item;
}

function getCarouselIndex() {
	console.log(carouselIndex);
	switch (carouselIndex) {
		case 1:
			return 'one';
			break;
		case 2:
			return 'two';
			break;
		case 3:
			return 'three';
			break;
		case 4:
			return 'four';
			break;
		case 5:
			return 'five';
			break;
		case 6:
			return 'six';
			break;
		case 7:
			return 'seven';
			break;
		case 8:
			return 'eight';
			break;
		case 9:
			return 'nine';
			break;
		case 10:
			return 'ten';
			break;
		case 11:
			return 'eleven';
			break;
		case 12:
			return 'twelve';
			break;
		case 13:
			return 'thirteen';
			break;
		case 14:
			return 'fourteen';
			break;
		case 15:
			return 'fifteen';
			break;
		case 16:
			return 'sixteen';
			break;
		case 17:
			return 'seventeen';
			break;
		case 18:
			return 'eighteen';
			break;
		case 19:
			return 'nineteen';
			break;
		case 20:
			return 'twenty';
			break;
	}
}