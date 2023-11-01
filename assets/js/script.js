const recipeSubmitBtn = document.getElementById('recipe-submit-btn');
const recipeRefreshBtn = document.getElementById('refresh-recipe-btn');
const movieSubmitBtn = document.getElementById('genre-submit-btn');
const movieRefreshBtn = document.getElementById('refresh-movie-btn');
var edamamAppID = "d55761af"
var edamamAPIKey = "4dd514756747177099b4472f62002d79"
var watchModeAPIKey = "xsVPrQhegCVFwP7yQKzZsWsGMKT7VMQE6ZiwJmgi"

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

            // RECIPE TITLE
            let recipeTitle = data.hits[randomRecipeNumber].recipe.label;
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
            recipeCard.textContent = recipeTitle;
            recipeCard.setAttribute('href', recipeLink);
            recipeCard.appendChild(populateRecipeImage);
            recipeContainer.appendChild(recipeCard);
        })
}

function getMovie() {
    var movieGenre = document.getElementById('genre-input').value
    var movieURL = 'https://api.watchmode.com/v1/list-titles/?append_to_response=sources&apiKey=' + watchModeAPIKey + "&genres=" + movieGenre
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

            // let unique = []
            // goodbye.sources.forEach(element => {
            //     if (!unique.includes(element)) {
            //         unique.push(element);
            //     }
            // });
            // console.log('UNIQUE ARRAY', unique);

            let newArray = [];
            let uniqueObject = {};

            for (let i in goodbye.sources) {

                let objName = goodbye.sources[i]['name'];

                uniqueObject[objName] = goodbye.sources[i];
            };

            for (i in uniqueObject) {
                newArray.push(uniqueObject[i]);
            }
            console.log(newArray);
            console.log(uniqueObject);

            let divForPlatform = document.createElement('ul');

            // MOVIE STREAMING
            for (b = 0; b < uniqueObject.length; b++) {
                
                let movieStreamingPlatform = uniqueObject[b].name;
                console.log("MOVIE STREAMING", movieStreamingPlatform);
                
                let movieStreamingURL = uniqueObject[b].web_url;
                console.log("MOVIE STREAMING URL", movieStreamingURL);
                
                let populateMovieStreamingInfo = document.createElement('a');
                populateMovieStreamingInfo.textContent = movieStreamingPlatform
                populateMovieStreamingInfo.setAttribute('class', 'movie-a')
                populateMovieStreamingInfo.setAttribute('href',movieStreamingURL);
                // movieCard.appendChild(populateMovieStreamingInfo);

                // CREATES PLATFORM DIV

                let platformList = document.createElement('li');

                divForPlatform.appendChild(platformList);
                platformList.appendChild(populateMovieStreamingInfo);
            }
            movieCard.appendChild(divForPlatform);

            // POPULATES MOVIE CONTAINER
            movieCard.setAttribute('class', 'movie-card');
            movieContainer.appendChild(movieCard);
            // movieCard.appendChild(populateMoviePoster);
            
            })
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
};

// Event Listener for Movie Refresh Button
function handleMovieRefreshBtn(event) {
    event.preventDefault()
    console.log('Movie Refresh Button Clicked');
    clearMovie();
};


// Button Event Listeners
recipeSubmitBtn.addEventListener('click', handleRecipeSubmitBtn);
movieSubmitBtn.addEventListener('click', handleMovieSubmitBtn);
recipeRefreshBtn.addEventListener('click', handleRecipeRefreshBtn);
movieRefreshBtn.addEventListener('click', handleMovieRefreshBtn);