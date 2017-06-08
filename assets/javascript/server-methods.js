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