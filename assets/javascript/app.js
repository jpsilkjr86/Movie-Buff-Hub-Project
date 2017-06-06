$(document).ready(function(){
	$('.modal').modal();
	
	// collapse functionality for side nav on mobile screens
	$(".button-collapse").sideNav();
	// initialize carousel
	// $('.carousel').carousel();
	// event listener for clicking submit
	$('#search-submit').on('click', function(event){
		// prevents page from auto-reloading
		event.preventDefault();
		// testing testing 123
		// saves main search query as variable
		var searchQuery = $('#main-search').val().trim();
		// empties input field
		$('#main-search').val('');

		// calls input validation function which returns bool
		if (isSearchInputValid(searchQuery)) {
			// gets a database key (unique id) for logging this search entry to firebase
			var searchKey = generateFirebaseSearchKey();

			// uses searchDataObject object constructor for setting initial data object values
			var searchObject = new searchDataObject(searchQuery, 'movie');

			// queries OMDB API and stores results onto firebase for convenient, persistent reference
			searchOMDBbyMovie(searchObject, searchKey);
		}  
		else {
			$('#my-modal-movie').modal('open');
		}			
	
	});



	// event listener for pressing ENTER key when in #main-search input field
	$('#main-search').on('keypress', function(event){
		// if the key is ENTER, trigger 'click' event on #search-submit
		if (event.which === 13) {$('#search-submit').trigger('click');}
	});

	// event listener for clicking submit on person search
	$('#person-submit').on('click', function(event){
		event.preventDefault();
		var personQuery = $('#person-search').val().trim();
		$('#person-search').val('');

		// calls input validation function which returns bool
		if (isSearchInputValid(personQuery)) {
			// gets a database key (unique id) for logging this search entry to firebase
			var searchKey = generateFirebaseSearchKey();

			// uses searchDataObject object constructor for setting initial data object values
			var searchObject = new searchDataObject(personQuery, 'person');

			// queries OMDB API and stores results onto firebase for convenient, persistent reference
			searchTMDBbyPerson(searchObject, searchKey);
		}	
		else{$('#my-modal-actor').modal('open');}		
	});

	// event listener for pressing ENTER key when in #person-search input field
	$('#person-search').on('keypress', function(event){
		// if the key is ENTER, trigger 'click' event on #person-submit
		if (event.which === 13) {$('#person-submit').trigger('click');}
		
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