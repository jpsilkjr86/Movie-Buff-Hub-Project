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
  var newChild = snapshot.val();
	if (newChild.queryType == 'movie') {
		var movieDiv = $('<div>');
		movieDiv.addClass('movie-suggestion');
	}  
  
  

}); // end of allsearches child_added event listener



