
document.getElementById('searchButton').addEventListener("click", searchMovies);

function searchMovies(){
  var searchText =document.getElementById('searchTextBox').value;
  var url = `http://www.omdbapi.com/?apikey=5966f4d8&r=json&s=${searchText}`;
  $.ajax({
    url:url,
    dataType: 'json'
  }).then(function(data){
    var cards = `<div class="row">`;
    var i = 1, id = 1;
    console.log(data);
    var movies = data.Search;
    movies.forEach(function(movie){
    if(i>3){
      i=1;
      cards += `</div><div class="row">`
    }
    cards += `<div class="col-4">
      <div id="Movie${id}" class="card" style="width: 18rem;">
        <img src="${movie.Poster}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
          <a class="btn btn-primary" role="button" href="#addReviewModal" data-toggle="modal" onclick="addReview('${movie.Title}');">Add Review</a>
        </div>
      </div>
      </div>`
      i++;
      id++
    })

    document.getElementById('movies').innerHTML = cards;
   }).catch(function(err){
    console.log("Error: "+err);
  });
}

function addReview(title){
    document.getElementById('movie_title').value=title;
    document.getElementById('movie_title').readOnly = true;
}
