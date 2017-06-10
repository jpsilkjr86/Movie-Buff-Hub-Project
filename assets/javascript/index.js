$(document).ready(function(){
	$(document).on('tap', '.carousel-item', function(event){
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
	}); // end of carousel tap event listener
});