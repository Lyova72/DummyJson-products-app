import storageManager from "./storage.js";
import app from "./Product Details.js";
const popUp = document.querySelector('.popUp')
function Fetch(){
    fetch('https://dummyjson.com/products?limit=4&sortBy=discountPercentage&order=desc')
    .then(res => res.json())
    .then(data => {
        render(data.products)
    });
}
Fetch()
const productContainer = document.querySelector('.homeProducts')
function render(productList = []){
    productContainer.innerHTML = ''
    if(productList.length == 0 && productList != null && typeof productList == "object"){
        productContainer.style.gridTemplateColumns = '1fr'
        productContainer.innerHTML = `
            <h1> No Information Was Found</h1>
        `
        return
    }    
    let storage = storageManager(null, "select")
    productList.forEach(product => {
        let existing = storage.find(item => product.id == item.id)
        let buyBtn = `<button id = '${product.id}' class = 'cartBtn'>Add to Cart<img class = 'icon' src = 'images/black-cart.png'> </button>`
        if(existing){
            buyBtn = `<button id = '${product.id}' class = 'cartBtn' disabled>Added</button>`
        }
        let description = product.description.slice(0, 70)
        
        let card = `
            <div class = 'card shadow product' >
                <div class = 'product-info' id = '${product.id}'>
                    <img class = 'thumbnail' src="${product.thumbnail ||product.images[0]}"onerror="this.onerror=null; this.src='../images/default.jpg';">
                    <h5> ${product.title}</h5>
                    <p class = 'description'>${description}...</p>
                    <p class = 'discount'>${product.discountPercentage}%  Off</p>
                    <span class = 'priceAndRating'> <span><b>$${product.price}</b> $<del>${Math.round(product.price / (1 - product.discountPercentage / 100))}</del></span> <span><i class="fa-solid fa-star" style="color: #FFD43B;"></i>${product.rating}</span></span>
                </div>
                ${buyBtn}
            </div>
        `
        productContainer.innerHTML += card
    })
    cartBtns(productList)
    if(app.initProductDetails('addToCart')){
        const closeBtn = document.querySelector('.btn-close')
        if(closeBtn) {
            closeBtn.addEventListener('click', () => {
                document.body.style.overflowY = 'auto'
                popUp.style.display = 'none'
                Fetch()
            })
        }
    }
}




function cartBtns(productList) {
    const btns = document.querySelectorAll(".cartBtn")

    btns.forEach(btn => {
        btn.addEventListener("click", () => {
            let storageData = storageManager(null, "select")

            let product = productList.find(p => p.id == btn.id)

            if(!product) return

            let existing = storageData.find(item => item.id == product.id)

            if(!existing) {
                let newProduct = { id:product.id, count: 1 }
                storageManager(newProduct, "insert")
            }
            btn.innerHTML = "Added"
        })
    })
}



const bars = document.querySelector('.bars')
const menu = document.querySelector('.menu')
if(bars && menu){
  bars.addEventListener('click', () => {
    menu.classList.toggle('activeMenu')
  })
}








