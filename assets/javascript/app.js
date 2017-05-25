// event listener for clicking submit
$('#search-submit').on('click', function(e){
	// prevents page from auto-reloading
	e.preventDefault();

	// saves main search query as variable
	var searchQuery = $('#main-search').val().trim();
	// empties input field
	$('#main-search').val('');

	searchTMDBbyMovie(searchQuery);
});