const recipeSubmitBtn = document.getElementById('recipe-submit-btn');
const recipeRefreshBtn = document.getElementById('refresh-recipe-btn');
const movieSubmitBtn = document.getElementById('genre-submit-btn');
const movieRefreshBtn = document.getElementById('refresh-movie-btn');
var edamamAppID = "d55761af"
var edamamAPIKey = "4dd514756747177099b4472f62002d79"
var watchModeAPIKey = "xsVPrQhegCVFwP7yQKzZsWsGMKT7VMQE6ZiwJmgi"


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

function getEdamamRecipe() {
    var searchQuery = document.getElementById('recipe-input').value
    var edamamRecipeURL = "https://api.edamam.com/api/recipes/v2?type=public&q=" + searchQuery + "&app_id=" + edamamAppID + "&app_key=" + edamamAPIKey + "&random=true"

    fetch(edamamRecipeURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log("RECIPE", data)
            var randomRecipeNumber = Math.floor(Math.random() * data.hits.length)
            console.log("RANDOM RECIPE NUMBER", randomRecipeNumber);

            clearRecipe();

            // RECIPE TITLE
            let recipeTitle = document.createElement('h2');
            let populateRecipeTitle = data.hits[randomRecipeNumber].recipe.label;
            console.log("RECIPE TITLE", recipeTitle);

            // RECIPE IMAGE
            let recipeImage = data.hits[randomRecipeNumber].recipe.image;
            console.log("RECIPE IMAGE", recipeImage);

            let populateRecipeImage = document.createElement('img');
            populateRecipeImage.setAttribute('src', recipeImage)

            // RECIPE LINK 
            let recipeLink = data.hits[randomRecipeNumber].recipe.shareAs;
            console.log("RECIPE LINK", recipeLink);

            // POPULATES RECIPE CONTAINER
            let recipeContainer = document.querySelector('.recipe-container')
            let recipeCard = document.createElement('a');

            recipeCard.setAttribute('class', 'recipe-card')
            recipeTitle.textContent = populateRecipeTitle;
            recipeCard.setAttribute('href', recipeLink);
            recipeCard.appendChild(recipeTitle);
            recipeCard.appendChild(populateRecipeImage);
            recipeContainer.appendChild(recipeCard);

        })
}

function getMovie() {

    var movieGenre = document.getElementById('genre-input').value
    movieGenre.trim()
    let correctGenre = 'RANDOMGENRE'
    var adjustedmovieGenre = movieGenre.toUpperCase()
    for (x = 0; x < listOfGenres.length; x++) {
        var compare = listOfGenres[x].name.toUpperCase()
        if (adjustedmovieGenre === compare) {
            console.log("nice!" + listOfGenres[x].id)
            correctGenre = listOfGenres[x].id
            break;
        }
    }
    
    var movieURL = 'https://api.watchmode.com/v1/list-titles/?append_to_response=sources&apiKey=' + watchModeAPIKey + "&genres=" + correctGenre
    let movieContainer = document.querySelector('.movie-container')
    let movieCard = document.createElement('div');

    fetch(movieURL)
        .then(function (apple) {
            return apple.json()
        })
        .then(function (banana) {
            console.log('BANANA', banana)
            var randomMovieNumber = Math.floor(Math.random() * banana.titles.length)
            console.log(randomMovieNumber)
            console.log(banana.titles[randomMovieNumber])

            clearMovie();

            // MOVIE TITLE
            let movieTitle = document.createElement('h2');
            let populateMovieTitle = banana.titles[randomMovieNumber].title;
            console.log("MOVIE TITLE", populateMovieTitle);

            // POPULATES MOVIE CONTAINER
            movieCard.setAttribute('class', 'movie-card');
            movieContainer.appendChild(movieCard);
            movieTitle.textContent = populateMovieTitle;
            movieCard.appendChild(movieTitle);
    
        var imbdtag = banana.titles[randomMovieNumber].imdb_id 
        console.log(imbdtag)
        var movieInfoURL = "https://api.watchmode.com/v1/title/"+imbdtag+"/details/?apiKey="+watchModeAPIKey+"&append_to_response=sources"
        fetch(movieInfoURL)
            .then(function(hello){
                return hello.json()
            })
            .then(function(goodbye){
            console.log(goodbye)

            clearMovie();

            // MOVIE POSTER
            let moviePoster = goodbye.poster;
            console.log("MOVIE POSTER", moviePoster);

            let populateMoviePoster = document.createElement('img');
            populateMoviePoster.setAttribute('src', moviePoster);

            // CREATES POSTER DIV
            let divForPoster = document.createElement('div');
            movieCard.appendChild(divForPoster);
            divForPoster.appendChild(populateMoviePoster);

            // MOVIE PLOT
            let moviePlot = goodbye.plot_overview;
            console.log("MOVIE PLOT", moviePlot);
            
            let populateMoviePlot = document.createElement('p');
            populateMoviePlot.textContent = moviePlot

            let newArray = [];
            let uniqueObject = {};

            for (let i in goodbye.sources) {

                let objName = goodbye.sources[i]['name'];

                uniqueObject[objName] = goodbye.sources[i];
            };

            for (i in uniqueObject) {
                newArray.push(uniqueObject[i]);
            }

            let divForPlatform = document.createElement('ul');

            // MOVIE STREAMING
            for (b = 0; b < newArray.length; b++) {
                
                let movieStreamingPlatform = newArray[b].name;
                console.log("MOVIE STREAMING", movieStreamingPlatform);
                
                let movieStreamingURL = newArray[b].web_url;
                console.log("MOVIE STREAMING URL", movieStreamingURL);
                
                let populateMovieStreamingInfo = document.createElement('a');
                populateMovieStreamingInfo.textContent = movieStreamingPlatform
                populateMovieStreamingInfo.setAttribute('class', 'movie-a')
                populateMovieStreamingInfo.setAttribute('href',movieStreamingURL);

                // CREATES PLATFORM DIV
                let platformList = document.createElement('li');
                divForPlatform.appendChild(platformList);
                platformList.appendChild(populateMovieStreamingInfo);
            }
            movieCard.appendChild(divForPlatform);

            // POPULATES MOVIE CONTAINER
            movieCard.setAttribute('class', 'movie-card');
            movieContainer.appendChild(movieCard);           
            });
    })
}

function clearRecipe() {
    let recipeContainer = document.querySelector('.recipe-container');
    recipeContainer.textContent = ''
}

function clearMovie() {
    let movieContainer = document.querySelector('.movie-container');
    movieContainer.textContent = ''
}

// Event Listener for Recipe Submit Button
function handleRecipeSubmitBtn(event) {
    event.preventDefault()
    console.log('Recipe Submit Button Clicked');
    getEdamamRecipe()
};

// Event Listener for Movie Submit Button
function handleMovieSubmitBtn(event) {
    event.preventDefault()
    console.log('Movie Submit Button Clicked');
    getMovie();
};

// Event Listener for Recipe Refresh Button
function handleRecipeRefreshBtn(event) {
    event.preventDefault()
    console.log('Recipe Refresh Button Clicked');
    clearRecipe();
    getEdamamRecipe()
};

// Event Listener for Movie Refresh Button
function handleMovieRefreshBtn(event) {
    event.preventDefault()
    console.log('Movie Refresh Button Clicked');
    clearMovie();
    getMovie();
};

// Button Event Listeners
recipeSubmitBtn.addEventListener('dblclick', (event) => {
    event.preventDefault();
});
movieSubmitBtn.addEventListener('dblclick', (event) => {
    event.preventDefault();
})
recipeRefreshBtn.addEventListener('dblclick', (event) => {
    event.preventDefault();
});
movieRefreshBtn.addEventListener('dblclick', (event) => {
    event.preventDefault;
});
recipeSubmitBtn.addEventListener('click', handleRecipeSubmitBtn);
movieSubmitBtn.addEventListener('click', handleMovieSubmitBtn);
recipeRefreshBtn.addEventListener('click', handleRecipeRefreshBtn);
movieRefreshBtn.addEventListener('click', handleMovieRefreshBtn);

