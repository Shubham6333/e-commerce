console.log("hi");

document.addEventListener("DOMContentLoaded", () =>{

    async function fetchProducts()
    {
         const response = await axios.get("https://fakestoreapi.com/products");
         return response.data;
    }

    async function populateProducts(flag, customProducts)
    {   
        let products  = customProducts
        if(flag == false)
        {
             products = await fetchProducts();
        }
         const productlist = document.getElementById("productList");

         products.forEach(product => {
              const productItem = document.createElement("a");
              productItem.target =  "_blank";
              productItem.classList.add("product-item", "text-decoration-none", "d-inline-block");
              productItem.href = "productDetails.html";

              const productImage = document.createElement("div");
              const productName = document.createElement("div");
              const productPrice = document.createElement("div");
              
              productImage.classList.add("product-img");
              productName.classList.add("product-name", "text-center");
              productPrice.classList.add("product-price", "text-center");     
              
              productName.textContent = product.title.substring(0, 12) + "...";
              productPrice.textContent = `\u20B9 ${product.price}`;

              const imageInsideProductImage = document.createElement("img");
              imageInsideProductImage.src = product.image;


              productImage.appendChild(imageInsideProductImage);
              productItem.appendChild(productImage);
              productItem.appendChild(productName);
              productItem.appendChild(productPrice);

              productlist.appendChild(productItem);

         });
    }

    populateProducts(false);

    const filterSearch = document.getElementById("search");
    filterSearch.addEventListener("click",async () => {
           const productList = document.getElementById("productList");
          const minPrice = Number(document.getElementById("minPrice").value);
          const maxPrice = Number(document.getElementById("maxPrice").value);
          const products = await fetchProducts();
          filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
          productList.innerHTML = "";
          populateProducts(true, filteredProducts);
    });

    const filterClear = document.getElementById("clear");
    filterClear.addEventListener("click",async () => {
           const productList = document.getElementById("productList");
           const minPrice = document.getElementById("minPrice");
           minPrice.value = "0";
           const maxPrice = document.getElementById("maxPrice");
           maxPrice.value = "0";
          productList.innerHTML = "";
          populateProducts(false);
    });


})