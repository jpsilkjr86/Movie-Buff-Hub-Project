
function getMainMovieCard (result) {

	var card = $('<div class="card horizontal blue-grey darken-4">');

	var cardImage = $('<div class="card-image">');
	var poster = $('<img>');
	poster.attr('src', result.Poster)
		.attr('alt', result.Title + ' Poster')
		.appendTo(cardImage);

	var cardStacked = $('<div class="card-stacked">');

	var cardContent = $('<div class="card-content">');
	var title = $('<h4>');
	title.text(result.Title)
		.appendTo(cardContent);
	var subTitle = $('<h5>');
	subTitle.html('Year Released: ' + result.Year + 
				'<br>Directed by: ' + result.Director + 
				'<br>Main Cast: ' + result.Actors)
			.appendTo(cardContent);

	var cardAction = $('<div class="card-action">');
	var link = $('<a href="#">');
	link.text('Some action here (website? button?)').appendTo(cardAction);

	cardStacked.append(cardContent).append(cardAction);

	card.append(cardImage).append(cardStacked);

	return card;
}

// function getMainMovieCard (result) {

// 	var card = $('<div class="card blue-grey darken-1">');

// 	var cardContent = $('<div class="card-content white-text">')

// 	var r1 = $('<div class="row">');
// 	var r1c1 = $('<div class="col s6">');
// 	var r1c2 = $('<div class="col s6">');

// 	var poster = $('<img>');

// 	poster.attr('src', result.Poster)
// 		.attr('alt', result.Title + ' Poster')
// 		.addClass('responsive-img')
// 		.css('padding', '10px')
// 		.appendTo(r1c1);

// 	var title = $('<h4>');
// 	title.text(result.Title)
// 		.appendTo(r1c2);

// 	var subTitle = $('<h5>');
// 	subTitle.html('Year Released: ' + result.Year + 
// 				'<br>Directed by: ' + result.Director + 
// 				'<br>Main Cast: ' + result.Actors)
// 			.appendTo(r1c2);

// 	r1.append(r1c1).append(r1c2).appendTo(cardContent);

// 	cardContent.appendTo(card);

// 	return card;
// }