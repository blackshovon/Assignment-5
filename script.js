const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('ingredient-close-btn');

searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getIngredient);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food" class = "ingredient">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}


function getIngredient(e){
    e.preventDefault();
    if(e.target.classList.contains('ingredient')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealIngredientsModal(data.meals));
    }
}

function mealIngredientsModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
            <h3>Ingredients:</h3>
        </div>
        <div class="ingredients-list">
        <p>${meal.strMeasure1}, ${meal.strIngredient1}</p>
        <p>${meal.strMeasure2}, ${meal.strIngredient2}</p>
        <p>${meal.strMeasure3}, ${meal.strIngredient3}</p>
        <p>${meal.strMeasure4}, ${meal.strIngredient4}</p>
        <p>${meal.strMeasure5}, ${meal.strIngredient5}</p>
        <p>${meal.strMeasure6}, ${meal.strIngredient6}</p>
        <p>${meal.strMeasure7}, ${meal.strIngredient7}</p>
        <p>${meal.strMeasure8}, ${meal.strIngredient8}</p>
    </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}