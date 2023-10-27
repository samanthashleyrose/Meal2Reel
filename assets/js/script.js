const recipeSubmitBtn = document.getElementById('recipe-submit-btn');
const recipeRefreshBtn = document.getElementById('refresh-recipe-btn');
const movieSubmitBtn = document.getElementById('genre-submit-btn');
const movieRefreshBtn = document.getElementById('refresh-movie-btn');
var edamamAppID = "ed1b726e"
var edamamAPIKey = "d073615b79a9ae208a7b60fb0981a82d"
var searchQuery = "pizza"
var watchModeAPIKey = "xsVPrQhegCVFwP7yQKzZsWsGMKT7VMQE6ZiwJmgi"
var movieGenre = "Action"

// Event Listener for Recipe Submit Button
function handleRecipeSubmitBtn() {
    recipeSubmitBtn.addEventListener('click');
};

// Event Listener for Movie Submit Button
function handleMovieSubmitBtn() {
    movieSubmitBtn.addEventListener('click');
};

// Event Listener for Recipe Refresh Button
function handleRecipeRefreshBtn() {
    recipeRefreshBtn.addEventListener('click');
};

// Event Listener for Movie Refresh Button
function handleRecipeRefreshBtn() {
    movieRefreshBtn.addEventListener('click');
};
var edamamRecipeURL = "https://api.edamam.com/api/recipes/v2?type=public&q="+searchQuery+"&app_id="+edamamAppID+"&app_key=" + edamamAPIKey +"&random=true"
        
function getEdamamRecipe() {
fetch(edamamRecipeURL)
.then(function (response) {
    return response.json()
    })
    .then(function (data) {
        console.log(data)})
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
getMovie()
        
