// function to get a user id by generating one on firebase
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

// function to write to firebase allsearches directory
function pushAllSearchesData(query) {
	
	var newRef = firebase.database().ref('allsearches');
	var userKey = getUserKey();

	var newData = {
		query: query,
		id: userKey,
		timestamp: firebase.database.ServerValue.TIMESTAMP
	};

	newRef.push(newData);
}

// function to write to firebase usersearch directory
function pushUserSearchData(query) {
	
	var userSearchesRef = firebase.database().ref('usersearches');
	var userKey = getUserKey();

	var newData = {
		query: query,
		timestamp: firebase.database.ServerValue.TIMESTAMP
	};

	userSearchesRef.child(userKey).push(newData);
}