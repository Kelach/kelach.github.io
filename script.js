// movies api config
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTU0YzFlMzIwMjJhYWM0NDQwZWIyMDNlNGFiNWFkMCIsInN1YiI6IjY0ODIwNDk5OTkyNTljMDBjNWIzNWU3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RhEo4vH75gwEGmAc5cZSUat9A6OKiwQe2p04-6icfMc'
    }
  };
const totalPages = 30; // update with max number of pages yout csn use
let pageIndex = 1 // global 
function generateCard(movieObject){
    let moviesSection = document.getElementById("movies-grid");

    // create movie div container
    let movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-card");

    // create star
    let star = document.createElement("span");
    star.classList.add("star");
    let starContent = document.createTextNode("⭐️");
    star.appendChild(starContent);

    // create rating
    let rating = document.createElement("span");
    let ratingContent = document.createTextNode(movieObject.vote_average);
    rating.classList.add("rating");
    rating.appendChild(ratingContent);

    // create average container
    let averageContainer = document.createElement("div");
    averageContainer.classList.add("movie-votes");
    averageContainer.appendChild(star);
    averageContainer.appendChild(rating);
    movieContainer.appendChild(averageContainer);

    // create movie image
    let image = document.createElement("img");
    image.src = "https://image.tmdb.org/t/p/w342" + movieObject.poster_path;
    image.alt = "Cover image of " + movieObject.original_title;
    image.classList.add("movie-poster");
    movieContainer.insertBefore(image, averageContainer);

    // create movie title
    let movieTitle = document.createElement("div");
    movieTitle.classList.add("movie-title");
    movieTitle.innerText = movieObject.original_title;
    
    movieContainer.appendChild(movieTitle);
    
    // append movie to section
    moviesSection.appendChild(movieContainer);

}

function loadMoreMovieCards(event) {
    // gets movies from API then adds 
    // it to the DOM, and filters movie cards
    inputValue = document.getElementById("search-input").value;
    if (pageIndex > totalPages) alert("No more movies to show!", pageIndex, totalPages);
    fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageIndex}`, options)
    .then(response => response.json())
    .then(data => {
        console.log("query: ", inputValue)
        data.results.forEach((movieObject) => {
            // update html
            generateCard(movieObject);
        });
        // update page index
        pageIndex += 1
        console.log("fetched data: ", data);
    })
    .catch(err => console.error(err));

    // filter 
}
function filterMovieCards(query, tags=null){
    movieCardsCollection = document.getElementsByClassName("movie-card");
    console.log(movieCardsCollection);
    for (const movieElement of movieCardsColection){
        movieTitle = movieElement.getElementByClassName.innerText;
    }
    // filters movie cards on html by query
    // and genre filters (stretch)
}
function handleSearchSubmit(event){
    event.preventDefault();
    // fetch movie db with new search query
    loadMoreMovieCards(event);
    alert("display loader video here");
}
window.onload = () => {
    loadMoreMovieCards();
    // event listeners
    loadMoreButton = document.getElementById("load-more-movies-btn");
    loadMoreButton.addEventListener("click", loadMoreMovieCards);
    searchButton = document.querySelector("#search-button");
    searchButton.addEventListener("click", handleSearchSubmit);
}
