console.log("hi");

async function fetchCategories() {
       
    const response = await fetch("https://fakestoreapi.com/products/categories");
    const data = await response.json();
    return data;
}

async function populateCategories()
{
      const categories = await fetchCategories();
     const categoryList = document.getElementById("categoryList");
    // console.log(categoryList);
     categories.forEach(category => {
            const categoryHolder = document.createElement("div");
            const categoryLink = document.createElement("a");
            categoryLink.href = `productlist.html?category=${category}`;
            categoryLink.textContent = category;
            categoryHolder.classList.add("category-item", "d-flex", "align-items-center", "justify-content-center");
            categoryHolder.appendChild(categoryLink);
            categoryList.appendChild(categoryHolder);

            //console.log(categoryList);
     });
}


populateCategories();


