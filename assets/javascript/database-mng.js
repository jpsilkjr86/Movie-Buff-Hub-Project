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

// Functionality for dynamically generating a MaterializeCSS carousel on index.html
var carouselIndex = 0;
var carouselLoadTimeout;
var isCarouselActive = false;

database.ref('allsearches').on('child_added', function(snapshot){
  // if it is either a movie or person AND if the carousel has not yet been activated
  if ((snapshot.val().queryType == 'movie' || snapshot.val().queryType == 'person') && !isCarouselActive) {
    // increments carousel index for the purpose of telling the app which place to put the new images
    carouselIndex++;
    // see timeout below
    clearTimeout(carouselLoadTimeout);

    if (snapshot.val().queryType == 'movie') {
      var movie = snapshot.val().results;
      var movieItem = getCarouselItem(movie.Poster);
      $('.carousel').prepend(movieItem);
    }
    if (snapshot.val().queryType == 'person') {
      var person = snapshot.val().results;
      var personItem = getCarouselItem(person.profile_path);
      $('.carousel').prepend(personItem);
    } 
      // initializes carousel if it takes longer than .3 seconds to load the next image 
    carouselLoadTimeout = setTimeout(function(){
      $('.carousel').carousel();
      isCarouselActive = true;
    }, 300);
  }
}); // end of allsearches child_added event listener


// child_added listener for history.html.
database.ref('usersearches/' + getUserKey() + '/').on('child_added', function(snapshot){
  // saves snapshot of child data as a more manageable variable
  var search = snapshot.val();
  console.log(search);

  if (search.queryType === 'movie') {
    // var smallMovieCard = getSmallMovieCard(search.results);
    // $('#search-history').append(smallMovieCard);
  }  

  
}); // end of allsearches child_added event listener

