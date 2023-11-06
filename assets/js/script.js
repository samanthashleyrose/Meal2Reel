// GLOBAL VARIABLES

var edamamAppID = "d55761af"
var edamamAPIKey = "4dd514756747177099b4472f62002d79"
var watchModeAPIKey = "8O83ZFl9jtMfdFpNwJDfIs5iTREGEjLEaltcXfEK"
const recipeSubmitBtn = document.getElementById('recipe-submit-btn');
const movieSubmitBtn = document.getElementById('genre-submit-btn');
const recipeRefreshBtn = document.getElementById('refresh-recipe-btn');
const movieRefreshBtn = document.getElementById('refresh-movie-btn');

var listOfGenres = [
    {
        "id": 1,
        "name": "Action",
        "tmdb_id": 28
    },
    {
        "id": 39,
        "name": "Action & Adventure",
        "tmdb_id": 10759
    },
    {
        "id": 30,
        "name": "Adult",
        "tmdb_id": null
    },
    {
        "id": 2,
        "name": "Adventure",
        "tmdb_id": 12
    },
    {
        "id": 3,
        "name": "Animation",
        "tmdb_id": 16
    },
    {
        "id": 33,
        "name": "Anime",
        "tmdb_id": null
    },
    {
        "id": 31,
        "name": "Biography",
        "tmdb_id": null
    },
    {
        "id": 4,
        "name": "Comedy",
        "tmdb_id": 35
    },
    {
        "id": 5,
        "name": "Crime",
        "tmdb_id": 80
    },
    {
        "id": 6,
        "name": "Documentary",
        "tmdb_id": 99
    },
    {
        "id": 7,
        "name": "Drama",
        "tmdb_id": 18
    },
    {
        "id": 8,
        "name": "Family",
        "tmdb_id": 10751
    },
    {
        "id": 9,
        "name": "Fantasy",
        "tmdb_id": 14
    },
    {
        "id": 34,
        "name": "Food",
        "tmdb_id": null
    },
    {
        "id": 28,
        "name": "Game Show",
        "tmdb_id": null
    },
    {
        "id": 10,
        "name": "History",
        "tmdb_id": 36
    },
    {
        "id": 11,
        "name": "Horror",
        "tmdb_id": 27
    },
    {
        "id": 21,
        "name": "Kids",
        "tmdb_id": 10762
    },
    {
        "id": 12,
        "name": "Music",
        "tmdb_id": 10402
    },
    {
        "id": 32,
        "name": "Musical",
        "tmdb_id": null
    },
    {
        "id": 13,
        "name": "Mystery",
        "tmdb_id": 9648
    },
    {
        "id": 36,
        "name": "Nature",
        "tmdb_id": null
    },
    {
        "id": 22,
        "name": "News",
        "tmdb_id": 10763
    },
    {
        "id": 23,
        "name": "Reality",
        "tmdb_id": 10764
    },
    {
        "id": 14,
        "name": "Romance",
        "tmdb_id": 10749
    },
    {
        "id": 40,
        "name": "Sci-Fi & Fantasy",
        "tmdb_id": 10765
    },
    {
        "id": 15,
        "name": "Science Fiction",
        "tmdb_id": 878
    },
    {
        "id": 25,
        "name": "Soap",
        "tmdb_id": 10766
    },
    {
        "id": 29,
        "name": "Sports",
        "tmdb_id": null
    },
    {
        "id": 37,
        "name": "Supernatural",
        "tmdb_id": null
    },
    {
        "id": 26,
        "name": "Talk",
        "tmdb_id": 10767
    },
    {
        "id": 17,
        "name": "Thriller",
        "tmdb_id": 53
    },
    {
        "id": 35,
        "name": "Travel",
        "tmdb_id": null
    },
    {
        "id": 38,
        "name": "TV Movie",
        "tmdb_id": 10770
    },
    {
        "id": 18,
        "name": "War",
        "tmdb_id": 10752
    },
    {
        "id": 41,
        "name": "War & Politics",
        "tmdb_id": 10768
    },
    {
        "id": 19,
        "name": "Western",
        "tmdb_id": 37
    }
]

//This function checks the local storage upon the page loading in. If the local storage is empty, the refresh buttons are unusable, so it sets the buttons to disabled. This function gets called at the bottom of the page.
function init() {
    localStorageMovieContainer = JSON.parse(localStorage.getItem("localStorageMovieContainer"))
    if (localStorageMovieContainer === null) {
        movieRefreshBtn.setAttribute("style", "cursor: no-drop")
        movieRefreshBtn.disabled = true
    }
    localStorageRecipeContainer = JSON.parse(localStorage.getItem("localStorageRecipeContainer"))
    if (localStorageRecipeContainer === null) {
        recipeRefreshBtn.setAttribute("style", "cursor: no-drop")
        recipeRefreshBtn.disabled = true
    }
}
// Function to use Edamam API to generate random recipe with user input
function getEdamamRecipe(searchQuery) {

    recipeRefreshBtn.removeAttribute("style")
    recipeRefreshBtn.disabled = false

    var edamamRecipeURL = "https://api.edamam.com/api/recipes/v2?type=public&q=" + searchQuery + "&app_id=" + edamamAppID + "&app_key=" + edamamAPIKey + "&random=true";

    fetch(edamamRecipeURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var randomRecipeNumber = Math.floor(Math.random() * data.hits.length);
            console.log("RECIPE INFO:", data);

            clearRecipe();
            if (data.count === 0) {
                let recipeContainer = document.querySelector('.recipe-container');
                let noRecipeFoundMessage = document.createElement('h2');
                noRecipeFoundMessage.textContent = "No recipe was found. Please try again with a different input."
                recipeContainer.appendChild(noRecipeFoundMessage)
                noRecipeFoundMessage.setAttribute('class', 'error-message');
                console.log("error");
            }
            else {
                // RECIPE TITLE
                let recipeTitle = document.createElement('h2');
                let populateRecipeTitle = data.hits[randomRecipeNumber].recipe.label;
                console.log("RECIPE TITLE:", populateRecipeTitle);


                // RECIPE IMAGE
                let recipeImage = data.hits[randomRecipeNumber].recipe.image;
                let populateRecipeImage = document.createElement('img');
                populateRecipeImage.setAttribute('src', recipeImage);
                console.log("RECIPE IMAGE:", recipeImage);

                // RECIPE LINK 
                let recipeLink = data.hits[randomRecipeNumber].recipe.shareAs;
                console.log("RECIPE LINK:", recipeLink);

                // POPULATES RECIPE CONTAINER
                let recipeContainer = document.querySelector('.recipe-container');
                let recipeCard = document.createElement('a');

                recipeCard.setAttribute('class', 'recipe-card');
                recipeCard.setAttribute('href', recipeLink);

                recipeTitle.textContent = populateRecipeTitle;
                recipeCard.appendChild(recipeTitle);

                recipeCard.appendChild(populateRecipeImage);
                recipeContainer.appendChild(recipeCard);
            }
        });
};

// Function to use Watchmode API to generate random movie/TV show with user input
function getMovie(correctGenre) {
    movieRefreshBtn.removeAttribute("style")
    movieRefreshBtn.disabled = false
    // Fetch to populate movie/TV show based off genre
    var movieURL = 'https://api.watchmode.com/v1/list-titles/?append_to_response=sources&apiKey=' + watchModeAPIKey + "&genres=" + correctGenre;

    fetch(movieURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var randomMovieNumber = Math.floor(Math.random() * data.titles.length);
            console.log('MOVIE TITLE DATA:', data);

            clearMovie();
            // MOVIE TITLE
            let movieTitle = document.createElement('h2');
            let populateMovieTitle = data.titles[randomMovieNumber].title;
            console.log("MOVIE TITLE:", populateMovieTitle);

            // POPULATES TITLE TO MOVIE CONTAINER
            let movieContainer = document.querySelector('.movie-container');
            let movieCard = document.createElement('div');

            movieCard.setAttribute('class', 'movie-card');
            movieTitle.textContent = populateMovieTitle;
            movieCard.appendChild(movieTitle);
            movieContainer.appendChild(movieCard);

            // Fetch to generate additional movie/TV show info
            var imbdTag = data.titles[randomMovieNumber].imdb_id
            var movieInfoURL = "https://api.watchmode.com/v1/title/" + imbdTag + "/details/?apiKey=" + watchModeAPIKey + "&append_to_response=sources";

            fetch(movieInfoURL)
                .then(function (meatloaf) {
                    return meatloaf.json();
                })
                .then(function (data) {
                    console.log("MOVIE INFO:", data);

                    clearMovie();

                    // MOVIE POSTER
                    let moviePoster = data.poster;
                    let populateMoviePoster = document.createElement('img');
                    populateMoviePoster.setAttribute('src', moviePoster);
                    console.log("MOVIE POSTER:", moviePoster);

                    // CREATES POSTER DIV
                    let divForPoster = document.createElement('div');
                    divForPoster.appendChild(populateMoviePoster);
                    movieCard.appendChild(divForPoster);

                    // MOVIE PLOT
                    let moviePlot = data.plot_overview;
                    let populateMoviePlot = document.createElement('p');
                    populateMoviePlot.textContent = moviePlot;
                    movieCard.appendChild(populateMoviePlot);
                    console.log("MOVIE PLOT:", moviePlot);

                    // Keeps duplicate streaming services from displaying
                    let newArray = [];
                    let uniqueObject = {};

                    for (let i in data.sources) {
                        let objName = data.sources[i]['name'];
                        uniqueObject[objName] = data.sources[i];
                    };

                    for (i in uniqueObject) {
                        newArray.push(uniqueObject[i]);
                    };

                    // MOVIE STREAMING
                    let divForPlatform = document.createElement('ul');

                    for (b = 0; b < newArray.length; b++) {

                        let movieStreamingPlatform = newArray[b].name;
                        console.log("MOVIE STREAMING ON:", movieStreamingPlatform);

                        let movieStreamingURL = newArray[b].web_url;
                        console.log("MOVIE STREAMING URL:", movieStreamingURL);

                        let populateMovieStreamingInfo = document.createElement('a');
                        populateMovieStreamingInfo.textContent = movieStreamingPlatform;
                        populateMovieStreamingInfo.setAttribute('class', 'movie-a')
                        populateMovieStreamingInfo.setAttribute('href', movieStreamingURL);

                        // CREATES PLATFORM DIV
                        let platformList = document.createElement('li');
                        platformList.appendChild(populateMovieStreamingInfo);
                        divForPlatform.appendChild(platformList);
                    }

                    if (correctGenre === "RANDOMGENRE") {
                        // let movieContainer = document.querySelector('.movie-container');
                        let movieError = document.createElement('h2');
                        movieError.setAttribute('class', 'error-message')
                        movieError.textContent = "No genre was found based on the given input. This is a random search result."
                        movieContainer.appendChild(movieError);
                    }
                    // POPULATES MOVIE INFO TO MOVIE CONTAINER
                    movieCard.setAttribute('class', 'movie-card');
                    movieCard.appendChild(divForPlatform);
                    movieContainer.appendChild(movieCard);

                });
        });
};

// Function to clear the recipe container
function clearRecipe() {
    let recipeContainer = document.querySelector('.recipe-container');
    recipeContainer.textContent = '';
};

// Function to clear the movie container
function clearMovie() {
    let movieContainer = document.querySelector('.movie-container');
    movieContainer.textContent = '';
};

// Recipe Submit Button
function handleRecipeSubmitBtn(event) {
    event.preventDefault();

    var localStorageRecipeContainer = {}
    var searchQuery = document.getElementById('recipe-input').value;
    localStorageRecipeContainer.storageRecipe = searchQuery
    // console.log(localStorageRecipeContainer)
    localStorage.setItem("localStorageRecipeContainer", JSON.stringify(localStorageRecipeContainer))
    getEdamamRecipe(searchQuery);
    document.getElementById('recipe-input').value = ""

};

// Movie Submit Button
function handleMovieSubmitBtn(event) {
    event.preventDefault();

    // Allows API to filter by genre entered by user -- Defaults to RANDOMGENRE if entered keyword is unusable
    var movieGenre = document.getElementById('genre-input').value;
    movieGenre.trim();
    let correctGenre = 'RANDOMGENRE';
    var adjustedmovieGenre = movieGenre.toUpperCase();

    for (x = 0; x < listOfGenres.length; x++) {
        var compare = listOfGenres[x].name.toUpperCase();

        if (adjustedmovieGenre === compare) {
            console.log("nice!" + listOfGenres[x].id);
            correctGenre = listOfGenres[x].id;
            break;
        };
    };
    var localStorageMovieContainer = {}
    localStorageMovieContainer.storageGenre = correctGenre
    localStorage.setItem("localStorageMovieContainer", JSON.stringify(localStorageMovieContainer))
    getMovie(correctGenre);
    document.getElementById('genre-input').value = ""
};

// Recipe Refresh Button
function handleRecipeRefreshBtn(event) {
    event.preventDefault();

    clearRecipe();
    localStorageRecipeContainer = JSON.parse(localStorage.getItem("localStorageRecipeContainer"))
    searchQuery = localStorageRecipeContainer.storageRecipe
    getEdamamRecipe(searchQuery);
};

// Movie Refresh Button
function handleMovieRefreshBtn(event) {
    event.preventDefault();
    clearMovie();
    localStorageMovieContainer = JSON.parse(localStorage.getItem("localStorageMovieContainer"))
    if (localStorageMovieContainer === null) {
        return
    } else {
        correctGenre = localStorageMovieContainer.storageGenre
    }
    getMovie(correctGenre);
};

// Button Event Listeners
recipeSubmitBtn.addEventListener('click', handleRecipeSubmitBtn);
movieSubmitBtn.addEventListener('click', handleMovieSubmitBtn);
recipeRefreshBtn.addEventListener('click', handleRecipeRefreshBtn);
movieRefreshBtn.addEventListener('click', handleMovieRefreshBtn);

// Button Event Listners to avoid multi-clicking
recipeSubmitBtn.addEventListener('dblclick', (event) => {
    event.preventDefault();
});
movieSubmitBtn.addEventListener('dblclick', (event) => {
    event.preventDefault();
});
recipeRefreshBtn.addEventListener('dblclick', (event) => {
    event.preventDefault();
});
movieRefreshBtn.addEventListener('dblclick', (event) => {
    event.preventDefault();
});

init()
