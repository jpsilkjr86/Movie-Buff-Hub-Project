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
  // this is firebase 

  var database = firebase.database();

  database.ref('allsearches').on('child_added', function(snapshot){
    var newChild = snapshot.val();

    $('#all-searches').append(newChild.query);
    

  });