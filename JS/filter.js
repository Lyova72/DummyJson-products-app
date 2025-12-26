import render  from "./cardRender.js"; 
const category = document.querySelector('.dropdown-sublist')
function categoryList(list){
    if(category){
        category.innerHTML = '<li class="dropdown-item category" data = "all">All</li>'
        list.forEach(item => {
            category.innerHTML += ` 
                <li class="dropdown-item category" data = '${item.slug}'>${item.name}</li>
            `
        })
        filterByCategory()
    }
}
export default categoryList



let pagination = document.querySelector('.pagination')
function filterByCategory () {
    const categories = document.querySelectorAll('.category')
    const highestPrice = document.querySelector('.highestPrice')
    const lowestPrice = document.querySelector('.lowestPrice')
    categories.forEach(category => {
        category.addEventListener('click', () => {
            if( category.getAttribute('data') == 'all'){
                fetch('https://dummyjson.com/products?limit=12&skip=0&select=title,price,images,thubnail,rating,description')
                .then(res => res.json())
                .then(data => {
                    render(data.products)
                });
                pagination.style.display = 'flex'
                return
            } else {
                pagination.style.display = 'none'
                fetch(`https://dummyjson.com/products/category/${category.getAttribute('data')}`)
                .then(res => res.json())
                .then(data => {
                    render(data.products)
                });
            }

        })
    })
    
    
    highestPrice.addEventListener('click', () => {
        localStorage.setItem('page', '0')
        fetch(`https://dummyjson.com/products?limit=12&skip=${JSON.parse(localStorage.getItem('page'))}&sortBy=price&order=${highestPrice.getAttribute('data')}`)
        .then(res => res.json())
        .then(data => {
            render(data.products)
        });
    })
    lowestPrice.addEventListener('click', () => {
        localStorage.setItem('page', '0')
        fetch(`https://dummyjson.com/products?limit=12&skip=${JSON.parse(localStorage.getItem('page'))}&sortBy=price&order=${lowestPrice.getAttribute('data')}`)
        .then(res => res.json())
        .then(data => {
            render(data.products)
        });
    })
}
