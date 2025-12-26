import render  from "./cardRender.js"; 
import categoryList from "./filter.js";
import page from "./pagination.js"

let pagination = document.querySelector('.pagination')
function limitedProducts(){
    fetch(`https://dummyjson.com/products?limit=12&skip=${JSON.parse(sessionStorage.getItem('page')) || 0}&select=title,price,images,thubnail,rating,description`)
    .then(res => res.json())
    .then(data => {
        if(pagination){
            pagination.style.display = 'flex'
        }
        render(data.products)
    })
}
limitedProducts()
export default limitedProducts



// all products
fetch('https://dummyjson.com/products?limit = 0&skip=0&select=title,price,images,thumbnail,rating,description')
.then(res => res.json())
.then(data => {
    page(data.total)

})


fetch('https://dummyjson.com/products/categories')
.then(res => res.json())
.then(data => {
    categoryList(data)
});



