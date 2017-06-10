// javascript for index.html only

// Functionality for dynamically generating a MaterializeCSS carousel on index.html
var carouselIndex = 0;
var carouselLoadTimeout;
var isCarouselActive = false;

// event listener for generating a materialize carousel
database.ref('allsearches').on('child_added', function(snapshot){
  // if it is either a movie or person AND if the carousel has not yet been activated
  if ((snapshot.val().queryType == 'movie' || snapshot.val().queryType == 'person') && !isCarouselActive) {
    // increments carousel index for the purpose of telling the app which place to put the new images
    carouselIndex++;
    // see timeout below
    clearTimeout(carouselLoadTimeout);

    if (snapshot.val().queryType == 'movie') {
      var movie = snapshot.val().results;
      var movieItem = getCarouselItem(movie, 'movie');
      $('.carousel').prepend(movieItem);
    }
    if (snapshot.val().queryType == 'person') {
      var person = snapshot.val().results;
      var personItem = getCarouselItem(person, 'person');
      $('.carousel').prepend(personItem);
    } 
      // initializes carousel if it takes longer than .3 seconds to load the next image 
    carouselLoadTimeout = setTimeout(function(){
      $('.carousel').carousel();
      isCarouselActive = true;
    }, 300);
  }
}); // end of carousel-generating event listener

$(document).ready(function(){
	// displays popular movies on index.html	
	displayPopular();

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