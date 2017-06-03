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

// function to write search entry data to both 'allusers' and 'usersearches' firebase directories
function writeSearchData(searchKey, query, queryType) {
	var userKey = getUserKey();
	
	var newSearchData = {
		query: query,
		queryType: queryType,
		id: userKey,
		timestamp: firebase.database.ServerValue.TIMESTAMP
	};

	database.ref('allsearches/' + searchKey).set(newSearchData);
	database.ref('usersearches/' + userKey + '/' + searchKey).set(newSearchData);
}