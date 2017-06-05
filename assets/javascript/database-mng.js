// Initialize Firebase
var config = {
  apiKey: "AIzaSyCT2tMPzSTWMUFnLWpw2SSuumErHTPEvds",
  authDomain: "movie-buff-hub-project.firebaseapp.com",
  databaseURL: "https://movie-buff-hub-project.firebaseio.com",
  projectId: "movie-buff-hub-project",
  storageBucket: "movie-buff-hub-project.appspot.com",
  messagingSenderId: "905481455751"
};
firebase.initializeApp(config);

var database = firebase.database();

// firebase database event listener for child_added in allsearches directory
database.ref('allsearches').on('child_added', function(snapshot){
  // saves snapshot of child data as a more manageable variable
  var newChild = snapshot.val();

  $('#all-searches').append(newChild.query);


  

}); // end of allsearches child_added event listener


// for index.html suggested movies 
database.ref('allsearches').on('child_added', function(snapshot){
  // saves snapshot of child data as a more manageable variable
  snapshot.val();
	if (snapshot.val().queryType == 'movie') {
		var movie = snapshot.val().searchResults;
    var movieDiv = getMovieSuggestionDiv(movie.Title, movie.Poster, movie.Year);
    $('#suggestions-onindex').prepend(movieDiv);
	}
  if (snapshot.val().queryType == 'person') {
    var person = snapshot.val().searchResults;
    var personDiv = getPersonSuggestionDiv(person.name, person.profile_path);
    $('#suggestions-onindex').prepend(personDiv);
  }  

}); // end of allsearches child_added event listener



