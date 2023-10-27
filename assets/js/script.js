var spoonAPIKey = "919c25609b004e1998fd520ad00d9a2d"
var searchTags = "pizza"
var randomRecipeURL = "http://api.spoonacular.com/recipes/random?tags=" + searchTags+ "&number=5&apiKey=" + spoonAPIKey

const recipeSubmitBtn = document.getElementById('recipe-submit-btn');
const recipeRefreshBtn = document.getElementById('refresh-recipe-btn');
const movieSubmitBtn = document.getElementById('genre-submit-btn');
const movieRefreshBtn = document.getElementById('refresh-movie-btn');

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

function getRandomRecipe() {
    fetch(randomRecipeURL)
        .then(response => response.json())
        .then(function (data) {
            console.log(data)
            var firstRecipe = data.recipes[0].extendedIngredients
            console.log(firstRecipe)
            console.log(firstRecipe.length)
            for(x = 0; x<firstRecipe.length;x++){
                console.log(firstRecipe[x].nameClean)
            }
            
      	})
}
getRandomRecipe()





//NOTE: Full recipe nutrition information is limited to 400 calls/month or 4000 calls/month for individual line analysis

var edamamAppID = "16e6d8f9"
var edamamAPIKey = "2155fb847350ae7c5c1e7ed9e4cab779"
var ingredient = "egg"
var nutritionURL = "https://api.edamam.com/api/nutrition-details?app_id=" + edamamAppID + "&app_key=" + edamamAPIKey + "&nutrition-type=logging&ingr=" + ingredient

function getIngredientNutrition() {
fetch(nutritionURL)
.then(function (response) {
return response.json()
})
.then(function (data) {
console.log(data)

        var ingredientCaloriesUnadjusted = data.calories
        console.log(ingredientCaloriesUnadjusted)

    var ingredientWeight = data.totalWeight
        console.log(ingredientWeight)

//adjust calories by weight (gives ingredient calories/gram)
var ingredientCaloriesAdjusted = (ingredientCaloriesUnadjusted/ingredientWeight)
console.log(ingredientCaloriesAdjusted)
})
}
getIngredientNutrition
