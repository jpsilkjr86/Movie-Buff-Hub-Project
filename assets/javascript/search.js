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