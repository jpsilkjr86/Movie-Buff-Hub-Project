
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

function getMainPersonCard (result) {

	var card = $('<div class="card horizontal blue-grey darken-4">');

	var cardImage = $('<div class="card-image">');
	var profile = $('<img>');
	profile.attr('src', result.profile_path)
		.attr('alt', result.name + ' Profile')
		.appendTo(cardImage);

	var cardStacked = $('<div class="card-stacked">');

	var cardContent = $('<div class="card-content">');
	var heading = $('<h4>');
	heading.text(result.name)
		.appendTo(cardContent);
	var subTitle = $('<h5>');
	subTitle.html('Known for:<br>' 
				+ result.known_for[0].original_title + '<br>'
				+ result.known_for[1].original_title + '<br>'
				+ result.known_for[2].original_title)
			.appendTo(cardContent);

	var cardAction = $('<div class="card-action">');
	var link = $('<a href="#">');
	link.text('Some action here (website? button?)').appendTo(cardAction);

	cardStacked.append(cardContent).append(cardAction);

	card.append(cardImage).append(cardStacked);

	return card;
}