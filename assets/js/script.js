var spoonAPIKey = "919c25609b004e1998fd520ad00d9a2d"
var searchTags = "pizza"
var randomRecipeURL = "http://api.spoonacular.com/recipes/random?tags=" + searchTags+ "&number=5&apiKey=" + spoonAPIKey


function getRandomRecipe() {
    fetch(randomRecipeURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            var firstRecipe = data.recipes[0]
            console.log(firstRecipe)
      	})
}
getRandomRecipe()
