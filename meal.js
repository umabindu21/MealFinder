

let params = new URLSearchParams(window.location.search);

let id = params.get("id");

console.log(id);

async function getMealDetails() {
    try {
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);

        let data = await response.json();

        console.log(data);

        let meal = data.meals[0];
        document.getElementById("mealName").innerText = meal.strMeal;
        document.getElementById("mealNameNav").innerText = meal.strMeal;
        document.getElementById("mealImage").src = meal.strMealThumb;
        document.getElementById("mealCategory").innerText = meal.strCategory;
        document.getElementById("mealSource").href = meal.strSource || "#";

        document.getElementById("mealSource").innerText = meal.strSource || "No source available";
        let tags = meal.strTags;

        if (tags) {
            let tagArray = tags.split(",");

            tagArray.forEach(tag => {
                document.getElementById("mealTags").innerHTML += `
            <span class="border border-danger rounded px-2 py-1 text-secondary text-danger">${tag}</span>
        `;
            });
        }
        let ingredientsList = document.getElementById("ingredientsList");

        for (let i = 1; i <= 20; i++) {
            let ingredient = meal[`strIngredient${i}`];

            if (ingredient) {
                ingredientsList.innerHTML += `
            <div class="col">
                <i class="bi bi-${i}-circle-fill me-1"></i> ${ingredient}
            </div>
        `;
            }
        }

        let measuresList = document.getElementById("mealMeasures");

        for (let i = 1; i <= 20; i++) {
            let measure = meal[`strMeasure${i}`];

            if (measure && measure.trim()) {
                measuresList.innerHTML += `
            <div class="col">🥄 ${measure}</div>
        `;
            }
        }

        document.getElementById("mealInstructions").innerText = meal.strInstructions;
        console.log(meal);
    }
    catch (error) {
        console.log(error);
    }
}

getMealDetails();

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
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");