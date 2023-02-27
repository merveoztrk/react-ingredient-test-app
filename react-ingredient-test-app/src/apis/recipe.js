import axios from "axios";
export const fetchRandomRecipe = async () =>
{
    const data = await axios.get( 'https://www.themealdb.com/api/json/v1/1/random.php' )
    return data
}

export const fetchRecipeCategories = async () =>
{
    const data = await axios.get( 'https://www.themealdb.com/api/json/v1/1/categories.php' )
    return data
}

export const fetchIngredientList = async () =>
{
    const data = await axios.get( 'www.themealdb.com/api/json/v1/1/list.php?i=list' )
    return data
}

export const fetchAllMeals = async () =>
{
    const data = await axios.get( 'https://www.themealdb.com/api/json/v1/1/search.php?s=' )
    return data
}

