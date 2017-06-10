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

