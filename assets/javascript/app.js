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

		searchOMDBbyMovie(searchQuery);

		// pushes search query into 'allsearches/' and to user's own search directory in 'usersearches/'
		pushAllSearchesData(searchQuery);
		pushUserSearchData(searchQuery);
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

		searchTMDBbyPerson(personQuery);
	});
}); // end of document ready