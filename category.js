let params = new URLSearchParams(window.location.search);

let category = params.get("category");

console.log(category);
document.getElementById("categoryTitle").innerText = category;

async function getMeals() {

    try {

        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);

        let data = await response.json();

        console.log(data);

        let meals = data.meals;

        displayMeals(meals);

    }
    catch (error) {
        console.log(error);
    }

}
getMeals();

function displayMeals(meals) {

    let container = document.getElementById("mealsContainer");

    container.innerHTML = "";

    meals.forEach(meal => {

        container.innerHTML += `
            <div class="col">
                <div class="card h-100 shadow-sm" onclick="openMeal('${meal.idMeal}')">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}" style="height: 200px; object-fit: cover;">

                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                    </div>
                </div>
            </div>
        `;
    });
}

async function getCategoryDescription() {

    try {

        let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");

        let data = await response.json();

        let categories = data.categories;

        let selectedCategory = categories.find(item => item.strCategory === category);

        document.getElementById("categoryDescription").innerText = selectedCategory.strCategoryDescription;

    }
    catch (error) {
        console.log(error);
    }

}

getCategoryDescription();




// Fetch categories from API
async function getCategories() {
    try {
        // console.log("hii")
        let response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");

        let data = await response.json();

        let categories = data.categories;
        console.log(categories)
        displayCategories(categories);
    }
    catch (error) {
        console.log(error);
    }
}


// Display categories
function displayCategories(categories) {

    let container = document.getElementById("categoriesContainer");

    container.innerHTML = "";

    categories.forEach(category => {

        container.innerHTML += `
            <div class="col">
               <a href="category.html?category=${category.strCategory}" class="text-decoration-none">
                   <div class="card h-100 border-0 shadow-sm category-card position-relative bg-light">

                       <span class="badge position-absolute top-0 end-0 m-2 px-2 py-1 rounded text-uppercase fw-bold"
                        style="background-color: #fd7e14; color: white;">
                        ${category.strCategory}
                       </span>

                        <img src="${category.strCategoryThumb}"
                           class="card-img-top p-3"
                           alt="${category.strCategory}"
                           style="height: 160px; object-fit: contain;">

                    </div>
                </a>
            </div>
        `;
    });
}


// Call function
getCategories();

function openMeal(id) {
    window.location.href = `mealdetail.html?id=${id}`;
}