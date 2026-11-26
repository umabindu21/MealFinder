
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
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");