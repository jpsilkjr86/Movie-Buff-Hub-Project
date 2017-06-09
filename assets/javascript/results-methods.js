
function getMainMovieCard (result) {

	var card = $('<div class="card-horizontal blue-grey darken-4">');
	var cardImage = $('<div class="card-image">');
	card.append(cardImage);
	var poster = $('<img class="left responsive-img">');
	poster.attr('src', result.Poster)
		.attr('alt', result.Title + ' Profile')
		.appendTo(cardImage);
	var cardTitle = $('<span class="center-align card-title">');
	cardTitle.html('<h2>' + result.Title + '</h2>');
	card.append(cardTitle);
	var ul = $('<ul class="collapsible" data-collapsible="accordion">');
	card.append(ul);
	var aboutLi = $('<li>');
	var castLi = $('<li>')
	ul.append(aboutLi);
	var aboutHead = $('<div class="blue-grey darken-3 collapsible-header">');
	aboutHead.text("About");
	aboutLi.append(aboutHead);
	var aboutBody = $('<div class="collapsible-body">');
	aboutBody.html('<p>Year Released: '+ result.Year +'</p><p>Directed by: '+ result.Director + '</p><p>Plot: ' + result.Plot + '</p>');
	aboutLi.append(aboutBody);
	ul.append(castLi);
	var castHead = $('<div class="blue-grey darken-3 collapsible-header">');
	castHead.text('Main Cast');
	castLi.append(castHead);
	var castBody = $('<div class="collapsible-body">');
	castBody.html('<p>'+ result.Actors +'</p>');
	castLi.append(castBody);

	// var card = $('<div class="card horizontal blue-grey darken-4">');

	// var cardImage = $('<div class="card-image">');
	// var poster = $('<img>');
	// poster.attr('src', result.Poster)
	// 	.attr('alt', result.Title + ' Poster')
	// 	.appendTo(cardImage);

	// var cardStacked = $('<div class="card-stacked">');

	// var cardContent = $('<div class="card-content">');
	// var title = $('<h4>');
	// title.text(result.Title)
	// 	.appendTo(cardContent);
	// var subTitle = $('<h5>');
	// subTitle.html('Year Released: ' + result.Year + 
	// 			'<br>Directed by: ' + result.Director + 
	// 			'<br>Main Cast: ' + result.Actors)
	// 		.appendTo(cardContent);

	// var cardAction = $('<div class="card-action">');
	// var link = $('<a href="#">');
	// link.text('Some action here (website? button?)').appendTo(cardAction);

	// cardStacked.append(cardContent).append(cardAction);

	// card.append(cardImage).append(cardStacked);

	return card;
}

function getMainPersonCard (result) {

	var card = $('<div class="card-horizontal blue-grey darken-4">');
	var cardImage = $('<div class="card-image">');
	card.append(cardImage);
	var profile = $('<img class="left responsive-img">');
	profile.attr('src', result.profile_path)
		.attr('alt', result.name + ' Profile')
		.appendTo(cardImage);
	var cardTitle = $('<span class="center-align card-title">');
	cardTitle.html('<h2>' + result.name + '</h2>');
	card.append(cardTitle);
	var ul = $('<ul class="collapsible" data-collapsible="accordion">');
	card.append(ul);
	var bioLi = $('<li>');
	var knownLi = $('<li>')
	ul.append(bioLi);
	var bioHead = $('<div class="blue-grey darken-3 collapsible-header">');
	bioHead.text("Biography");
	bioLi.append(bioHead);
	var bioBody = $('<div class="collapsible-body">');
	bioBody.html('<p>' + result.details.biography + '</p>');
	bioLi.append(bioBody);
	ul.append(knownLi);
	var knownHead = $('<div class="blue-grey darken-3 collapsible-header">');
	knownHead.text('Known For');
	knownLi.append(knownHead);
	var knownBody = $('<div class="collapsible-body">');
	knownBody.html('<p>' 
				+ result.known_for[0].original_title + '</p><p>'
				+ result.known_for[1].original_title + '</p><p>'
				+ result.known_for[2].original_title + '</p>');
	knownLi.append(knownBody);

	// var card = $('<div class="card horizontal blue-grey darken-4">');

	// var cardImage = $('<div class="card-image">');
	// var profile = $('<img>');
	// profile.attr('src', result.profile_path)
	// 	.attr('alt', result.name + ' Profile')
	// 	.appendTo(cardImage);

	// var cardStacked = $('<div class="card-stacked">');

	// var cardContent = $('<div class="card-content">');
	// var heading = $('<h4>');
	// heading.text(result.name)
	// 	.appendTo(cardContent);
	// var subTitle = $('<h5>');
	// subTitle.html('Known for:<br>' 
	// 			+ result.known_for[0].original_title + '<br>'
	// 			+ result.known_for[1].original_title + '<br>'
	// 			+ result.known_for[2].original_title)
	// 		.appendTo(cardContent);

	// var cardAction = $('<div class="card-action">');
	// var link = $('<a href="#">');
	// link.text('Some action here (website? button?)').appendTo(cardAction);

	// cardStacked.append(cardContent).append(cardAction);

	// card.append(cardImage).append(cardStacked);

	return card;
}