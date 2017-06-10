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