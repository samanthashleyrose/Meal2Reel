var spoonAPIKey = "919c25609b004e1998fd520ad00d9a2d"
var searchTags = "pizza"
var randomRecipeURL = "http://api.spoonacular.com/recipes/random?tags=" + searchTags+ "&number=5&apiKey=" + spoonAPIKey


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
// getIngredientNutrition()

