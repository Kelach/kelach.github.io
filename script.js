// movies api config
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTU0YzFlMzIwMjJhYWM0NDQwZWIyMDNlNGFiNWFkMCIsInN1YiI6IjY0ODIwNDk5OTkyNTljMDBjNWIzNWU3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RhEo4vH75gwEGmAc5cZSUat9A6OKiwQe2p04-6icfMc'
    }
  };

// movie db api query params + urls
let pageIndex = 1;
let movieQuery = ""; 
let movieSearchUrl = `https://api.themoviedb.org/3/search/movie?query=${movieQuery}&include_adult=false&language=en-US&page=${pageIndex}`
let nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageIndex}`;
let isSearch = false;
const totalPages = 30; // update with max number of pages yout csn use
function generateCard(movieObject){
    let moviesSection = document.getElementById("movies-grid");

    // create movie div container
    let movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-card");

    // // create star
    // let star = document.createElement("span");
    // star.classList.add("star");
    // let starContent = document.createTextNode("⭐️");
    // star.appendChild(starContent);

    // create rating
    let rating = document.createElement("span");
    let ratingContent = document.createTextNode(`${movieObject.vote_average.toFixed(1)} ⭐️`);
    rating.classList.add("rating");
    rating.appendChild(ratingContent);

    // create votes
    let votesElement = document.createElement("span");
    let votes_count = document.createTextNode(`${movieObject.vote_count} votes`);
    votesElement.classList.add("movie-votes");
    votesElement.appendChild(votes_count);

    // create average container
    let averageContainer = document.createElement("div");
    averageContainer.classList.add("movie-average");
    averageContainer.appendChild(rating);
    averageContainer.appendChild(votesElement);
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

async function loadMoreMovieCards(event, url) {
    // gets movies from API then adds 
    // it to the DOM, and filters movie cards
    if (pageIndex > totalPages) alert("No more movies to show!", pageIndex, totalPages);

    response = await fetch(url, options);
    data = await response.json();
    data.results.forEach((movieObject) => {
        // update html
        generateCard(movieObject);
    });
    // update search url queries
    pageIndex += 1
    movieSearchUrl = `https://api.themoviedb.org/3/search/movie?query=${movieQuery}&include_adult=false&language=en-US&page=${pageIndex}`
    nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageIndex}`;
    
    console.log("page index", pageIndex);
    console.log("fetched data: ", data);
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
    // update movie search queries
    isSearch = true;
    document.getElementById("close-search-btn").classList.add("show");

    pageIndex = 1;
    document.getElementById("movies-grid").innerHTML = "" // resetting movie cards
    movieSearchUrl = `https://api.themoviedb.org/3/search/movie?query=${movieQuery}&include_adult=false&language=en-US&page=${pageIndex}`

    // fetch movie db with new search query
    loadMoreMovieCards(event, movieSearchUrl);
    // alert("display loader video here");
}
function handleButtonLoadMore(event){
    event.preventDefault();
    url = isSearch ? movieSearchUrl : nowPlayingURL;
    loadMoreMovieCards(event, url);
}
function updateSearchValue(event){
    movieQuery = event.target.value;
}
function resetPage(event){
    document.getElementById("movies-grid").innerHTML = "" // resetting movie cards
    isSearch = false;
    document.getElementById("close-search-btn").classList.remove("show");

    pageIndex = 1;
    nowPlayingURL = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${pageIndex}`;
    loadMoreMovieCards(event, nowPlayingURL);
}
window.onload = () => {
    loadMoreMovieCards(null, nowPlayingURL);
    // event listeners
    loadMoreButton = document.getElementById("load-more-movies-btn");
    searchInput = document.getElementById("search-input");
    searchButton = document.querySelector("#search-button");
    resetButton = document.getElementById("close-search-btn");

    loadMoreButton.addEventListener("click", handleButtonLoadMore);
    searchButton.addEventListener("click", handleSearchSubmit);
    searchInput.addEventListener("input", updateSearchValue);
    resetButton.addEventListener("click", resetPage);

}
