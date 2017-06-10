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

// declares a local array variable for storing all user searches for comparison purposes
var allUserSearches = [];

// updates local variable with database in real time
database.ref('usersearches/' + getUserKey() + '/allsearches').on('child_added', function(snapshot){
  allUserSearches.push(snapshot.val());
});

// child_added listener for history.html.
database.ref('usersearches/' + getUserKey() + '/allsearches').on('child_added', function(snapshot){
  // saves snapshot of child data as a more manageable variable
  var search = snapshot.val();

  if (search.queryType === 'movie') {
    var smallMovieCard = getSmallMovieCard(search.results);
    $('#search-history').prepend(smallMovieCard);
  }
  if (search.queryType === 'person') {
    var smallPersonCard = getSmallPersonCard(search.results);
    $('#search-history').prepend(smallPersonCard);
  }  
}); // end of history.html event listener

// event listener for search.html last search result
database.ref('usersearches/' + getUserKey() + '/lastsearch').on('value', function(snapshot){
  var search = snapshot.val();
  if (search.queryType != null){
    if (search.queryType === 'movie') {
        // testing appending of main movie card
        var mainMovieCard = getMainMovieCard(search.results);
        $('#main-result').html(mainMovieCard);
        $('.collapsible').collapsible();
    }
    if (search.queryType === 'person') {
       // testing appending of main person card
        var mainPersonCard = getMainPersonCard(search.results);
        $('#main-result').html(mainPersonCard);
        $('.collapsible').collapsible();
    } 
  }
});  // end of lastsearch event listener

