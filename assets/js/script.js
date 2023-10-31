const recipeSubmitBtn = document.getElementById('recipe-submit-btn');
const recipeRefreshBtn = document.getElementById('refresh-recipe-btn');
const movieSubmitBtn = document.getElementById('genre-submit-btn');
const movieRefreshBtn = document.getElementById('refresh-movie-btn');
var edamamAppID = "d55761af"
var edamamAPIKey = "4dd514756747177099b4472f62002d79"
var watchModeAPIKey = "xsVPrQhegCVFwP7yQKzZsWsGMKT7VMQE6ZiwJmgi"
var movieGenre = "Action"
        
function getEdamamRecipe() {
    var searchQuery = document.getElementById('recipe-input').value
    var edamamRecipeURL = "https://api.edamam.com/api/recipes/v2?type=public&q="+searchQuery+"&app_id="+edamamAppID+"&app_key=" + edamamAPIKey +"&random=true"

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
        populateRecipeImage.setAttribute('src',recipeImage)

        // RECIPE LINK 
        let recipeLink = data.hits[randomRecipeNumber].recipe.shareAs;
        console.log("RECIPE LINK", recipeLink);
        
        // POPULATES RECIPE CONTAINER
        let recipeContainer = document.querySelector('.recipe-container')
        let recipeCard = document.createElement('a');

        recipeCard.setAttribute('class','recipe-card')
        recipeCard.textContent = recipeTitle;
        recipeCard.setAttribute('href', recipeLink);
        recipeCard.appendChild(populateRecipeImage);
        recipeContainer.appendChild(recipeCard);
    })
}

var movieURL = 'https://api.watchmode.com/v1/list-titles/?append_to_response=sources&apiKey=' + watchModeAPIKey + "&genres="+movieGenre

function getMovie() {
    fetch(movieURL)
    .then(function (apple){
        return apple.json()
    })
    .then(function (banana){
        console.log(banana)
        var randomMovieNumber = Math.floor(Math.random() * banana.titles.length)
        console.log(randomMovieNumber)
        console.log(banana.titles[randomMovieNumber])
    })
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
};

// Event Listener for Recipe Refresh Button
function handleRecipeRefreshBtn(event) {
    event.preventDefault()
    console.log('Recipe Refresh Button Clicked');
};

// Event Listener for Movie Refresh Button
function handleMovieRefreshBtn(event) {
    event.preventDefault()
    console.log('Movie Refresh Button Clicked');
};

// Button Event Listeners
recipeSubmitBtn.addEventListener('click', handleRecipeSubmitBtn);
movieSubmitBtn.addEventListener('click', handleMovieSubmitBtn);
recipeRefreshBtn.addEventListener('click', handleRecipeRefreshBtn);
movieRefreshBtn.addEventListener('click', handleMovieRefreshBtn);