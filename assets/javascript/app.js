$(document).ready(function(){
	// initialize modals
	$('.modal').modal();
	// collapse functionality for side nav on mobile screens
	$(".button-collapse").sideNav();
	displayPopular();
	// event listener for clicking submit
	$('#movie-form').on('submit', function(event){
		// prevents page from auto-reloading
		event.preventDefault();
		// saves main search query as variable
		var searchQuery = $('#main-search').val().trim();
		// empties input field
		$('#main-search').val('');

		// calls input validation function which returns bool
		if (!isSearchInputEmpty(searchQuery)) {
			// checks if it was searched before
			if (!wasSearchedBefore(searchQuery, 'movie')) {
				// gets a database key (unique id) for logging this search entry to firebase
				var searchKey = generateFirebaseSearchKey();

				// uses searchDataObject object constructor for setting initial data object values
				var searchObject = new searchDataObject(searchQuery, 'movie', searchKey);

				// queries OMDB API and stores results onto firebase for convenient, persistent reference
				searchOMDBbyMovie(searchObject, searchKey);		
			}
			else { // i.e. if the search has been searched before
  				// updates lastsearch with recycled object data to avoid duplicate entries
  				reuseSearchData(searchQuery, 'movie');
			}
		}
		else {$('#my-modal-movie').modal('open');}			
	});

	// event listener for clicking submit on person search
	$('#person-form').on('submit', function(event){
		event.preventDefault();
		var personQuery = $('#person-search').val().trim();
		$('#person-search').val('');

		// calls input validation function which returns bool
		if (!isSearchInputEmpty(personQuery)) {
			if (!wasSearchedBefore(personQuery, 'person')) {
				// gets a database key (unique id) for logging this search entry to firebase
				var searchKey = generateFirebaseSearchKey();

				// uses searchDataObject object constructor for setting initial data object values
				var searchObject = new searchDataObject(personQuery, 'person', searchKey);

				// queries OMDB API and stores results onto firebase for convenient, persistent reference
				searchTMDBbyPerson(searchObject, searchKey);
			}
			else { // i.e. if the search has been searched before
  				// updates lastsearch with recycled object data to avoid duplicate entries
  				reuseSearchData(personQuery, 'person');
			}
		}
		else {$('#my-modal-actor').modal('open');}	
	});

	// event listener for clicking on <a class="link">
	$(document).on('click', '.link', function(event){
		console.log($(this).attr('data-name'));
		// prevents page from trying to seek the href link #
		event.preventDefault();		
		// gets the query and queryType from data
		var query = $(this).attr('data-name');
		var queryType = $(this).attr('data-type');
		// if it was not already searched before, create new entry
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
		} // else, i.e. if query was already searched before
		else {reuseSearchData(query, queryType);}
	}); // end of link click event listener


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