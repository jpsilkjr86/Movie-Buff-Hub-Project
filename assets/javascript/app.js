$(document).ready(function(){
	// event listener for clicking submit
	$('#search-submit').on('click', function(event){
		// prevents page from auto-reloading
		event.preventDefault();
		// testing testing 123
		// saves main search query as variable
		var searchQuery = $('#main-search').val().trim();
		// empties input field
		$('#main-search').val('');

		// gets a database key (unique id) for logging this search entry to firebase
		var newSearchKey = generateFirebaseSearchKey();

		// queries OMDB API and stores results onto firebase for convenient, persistent reference
		searchOMDBbyMovie(searchQuery, newSearchKey);

		// pushes data into 'allsearches/' and to user's own search directory in 'usersearches/'
		writeSearchData(newSearchKey, searchQuery, 'movie');
	});

	// event listener for pressing ENTER key when in the input field
	$('#main-search').on('keypress', function(event){
		// if the key is ENTER, trigger 'click' event on #search-submit
		if (event.which === 13) {$('#search-submit').trigger('click');}
	});

	// event listener for clicking submit on person search
	$('#person-submit').on('click', function(event){
		event.preventDefault();
		var personQuery = $('#person-search').val().trim();
		$('main-search').val('');

		// gets a database key (unique id) for logging this search entry to firebase
		var newSearchKey = generateFirebaseSearchKey();

		// queries TMDB API and stores results onto firebase for convenient, persistent reference
		searchTMDBbyPerson(personQuery, newSearchKey);

		// pushes data into 'allsearches/' and to user's own search directory in 'usersearches/'
		writeSearchData(newSearchKey, personQuery, 'person');
	});


	// event listeners for data-management during development phase - DELETE BEFORE DEPLOYMENT
	$(document).on('keypress', function(event){
		// console.log(event.which);
		// if user presses *, clears local storage
		if (event.which === 42) {localStorage.clear();}
		// if user presses ~, clears all data in database
		if (event.which === 126) {database.ref().set({});}
		// if user presses ?, displays user key in console
		if (event.which === 63) {console.log(localStorage.getItem('User Key'));}
	});
}); // end of document ready