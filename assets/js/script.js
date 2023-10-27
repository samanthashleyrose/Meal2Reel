// var spoonAPIKey = "919c25609b004e1998fd520ad00d9a2d"
// var searchTags = "pizza"
// var randomRecipeURL = "http://api.spoonacular.com/recipes/random?tags=" + searchTags+ "&number=5&apiKey=" + spoonAPIKey

var edamamAppID = "ed1b726e"
var edamamAPIKey = "d073615b79a9ae208a7b60fb0981a82d"
var searchQuery = "pizza"
var edamamRecipeURL = "https://api.edamam.com/api/recipes/v2?type=public&q="+searchQuery+"&app_id="+edamamAppID+"&app_key=" + edamamAPIKey +"&random=true"
        
function getEdamamRecipe() {
fetch(edamamRecipeURL)
.then(function (response) {
    return response.json()
    })
    .then(function (data) {
        console.log(data)})
}

var watchModeAPIKey = "xsVPrQhegCVFwP7yQKzZsWsGMKT7VMQE6ZiwJmgi"
var movieGenre = "Action"
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
        
        // var edamamAppID = "16e6d8f9"
        // var edamamAPIKey = "2155fb847350ae7c5c1e7ed9e4cab779"
        // var ingredient = "egg"
        // var nutritionURL = "https://api.edamam.com/api/nutrition-details?app_id=" + edamamAppID + "&app_key=" + edamamAPIKey + "&nutrition-type=logging&ingr=" + ingredient
        
        // function getIngredientNutrition() {
// fetch(nutritionURL)
// .then(function (response) {
    // return response.json()
    // })
    // .then(function (data) {
        // console.log(data)

        //         var ingredientCaloriesUnadjusted = data.calories
        //         console.log(ingredientCaloriesUnadjusted)
        
        //     var ingredientWeight = data.totalWeight
        //         console.log(ingredientWeight)
        
        // //adjust calories by weight (gives ingredient calories/gram)
        // var ingredientCaloriesAdjusted = (ingredientCaloriesUnadjusted/ingredientWeight)
        // console.log(ingredientCaloriesAdjusted)
        // })
        // }
        // // getIngredientNutrition()
        
        //Spoonacular API limits to 50 results per day
        // function getRandomRecipe() {
        //     fetch(randomRecipeURL)
        //         .then(response => response.json())
        //         .then(function (data) {
        //             console.log("five random recipes:", data)
        //             var firstRecipe = data.recipes[0].extendedIngredients
        //             console.log("first Recipe from list: ", firstRecipe)
        //             console.log("number of ingredients: " + firstRecipe.length)
        //             for(x = 0; x<firstRecipe.length;x++){
        //                 console.log(firstRecipe[x].nameClean)
        //             }
        //       	})
        // }
        // getRandomRecipe()
        
        //NOTE: Full recipe nutrition information is limited to 400 calls/month or 4000 calls/month for individual ingredient analysis