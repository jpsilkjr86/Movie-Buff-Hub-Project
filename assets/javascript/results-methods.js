
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
	var ul = $('<ul class="collapsible" data-collapsible="expandable">');
	card.append(ul);
	var bioLi = $('<li>');
	var knownLi = $('<li>')
	ul.append(bioLi);
	var liHead = $('<div class="blue-grey darken-3 collapsible-header">');
	liHead.text("Biography")
	bioLi.append(liHead);
	var bioBody = $('<div class="collapsible-body">');
	bioBody.html('<p id="'+result.id+'"></p>')
	bioLi.append(bioBody);
	ul.append(knownLi);



	// <div class="card-horizontal blue-grey darken-4">
	//   <div class="card-image">
	//     <img class="left" src="https://image.tmdb.org/t/p/w300/2daC5DeXqwkFND0xxutbnSVKN6c.jpg" alt="">
	//   </div>
	//   <span class="center-align card-title"><h2>Bradley Cooper</h2></span>
	//   <ul class="collapsible" data-collapsible="accordion">
	//     <li>
	//       <div class="collapsible-header">Biography</div>
	//       <div class="collapsible-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae hic vitae inventore, explicabo laborum eius laboriosam, possimus autem quae molestiae? Amet nisi, magnam, quidem ad nostrum non modi perspiciatis consectetur.</div>
	//     </li>
	//     <li>
	      
	//     </li>
	//   </ul>
	// </div>

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