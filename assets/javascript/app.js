// event listener for clicking submit
$('#search-submit').on('click', function(e){
	// prevents page from auto-reloading
	e.preventDefault();
	// testing testing 123
	// saves main search query as variable
	var searchQuery = $('#main-search').val().trim();
	// empties input field
	$('#main-search').val('');

	searchOMDBbyMovie(searchQuery);
});

// event listener for pressing ENTER key when in the input field
$('#main-search').on('keypress', function(e){
	// if the key is ENTER, trigger 'click' event on #search-submit
	if (e.which === 13) {$('#search-submit').trigger('click');}
});