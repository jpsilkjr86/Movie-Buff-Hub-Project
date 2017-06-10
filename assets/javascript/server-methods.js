// function to get a user key (unique id) by generating one on firebase
function generateFirebaseUserKey() {
	var userRef = firebase.database().ref('usersearches');
	var gotKey = userRef.push().key;
	gotKey = 'user_' + gotKey; // adds 'user_' to the beginning of the string
	return gotKey;
}

// function to get a key (unique id) for a search entry by generating one on firebase
function generateFirebaseSearchKey() {
	var searchesRef = firebase.database().ref('allsearches');
	var gotKey = searchesRef.push().key;
	gotKey = 'search_' + gotKey; // adds 'user_' to the beginning of the string
	return gotKey;
}

// object constructur that returns a search data object. some of the data object's
// properties will be updated after the ajax request is complete.
function searchDataObject(query, queryType, searchKey) {
	this.query = query;
	this.queryType = queryType;
	this.searchKey = searchKey;
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
	database.ref('usersearches/' + searchObject.id + '/allsearches/' + searchKey).set(searchObject);
	database.ref('usersearches/' + searchObject.id + '/lastsearch').set(searchObject);
}

// calls function which listens for firebase uploading to finish before redirecting to a given destination
function afterLoadRedirectTo(searchObject, destination) {
	// functionality for loading search.html only if user is not currently on search.html
	var currentPath = window.location.href; // captures user's current filepath
	var currentPage = currentPath.substr(currentPath.length - 11); // saves last 11 characters of path
	if (currentPage !== destination) {
		// add event handler for listening to changes in lastsearch
		database.ref('usersearches/' + getUserKey() + '/lastsearch').on('value', function(snapshot){
			console.log('snapshot', snapshot.val());
			// if the value equals the search object, redirect to destination
			if (snapshot.val().results.name === searchObject.results.name) {
				destination = './' + destination;
				setTimeout(function(){window.location.href = destination;}, 200);
			}
		});
	}		
}

// function to update lastsearch by reusing a search entry from the user's search history
function reuseSearchData(query, queryType) {
	var searchObject = {};
	if (queryType === 'movie') {
		// loops through user's search history and gets old search object data
		searchObject = getSearchDataFromHistory(query, 'movie');
	}
	if (queryType === 'person') {
		// loops through user's search history and gets old search object data
		searchObject = getSearchDataFromHistory(query, 'person');
	}
	// reuses search object data to update lastsearch
	database.ref('usersearches/' + searchObject.id + '/lastsearch').set(searchObject);
	// redirects to search.html if not already there
	afterLoadRedirectTo(searchObject, 'search.html');
}

// function to update lastsearch by reusing a search entry from the user's search history
// function reuseSearchData(searchObject) {
// 	// reuses search object data to update lastsearch
// 	database.ref('usersearches/' + searchObject.id + '/lastsearch').set(searchObject);
// }