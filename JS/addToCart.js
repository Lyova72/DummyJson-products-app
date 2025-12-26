import storageManager from "./storage.js";
import app from "./Product Details.js";

const popUp = document.querySelector('.popUp')
function Fetch(){
    fetch('https://dummyjson.com/products?limit=0&skip=0&select=title,price,images,thubnail,rating,description')
    .then(res => res.json())
    .then(data => {
        addToCart(storageManager(null, 'select'), data.products)
    })
}
Fetch()



const productContainer = document.querySelector('.product-box')
function addToCart(cartProductId, productList){
    productContainer.innerHTML = ''
    cartProductId.forEach(productId => {
        let product = productList.find(p => p.id == productId.id)
        let description = product.description.slice(0, 70)

        let card = `
            <div class = 'card shadow product cart'  >
            <button class = 'cartDelate btn-close ' id = '${product.id}'></button>
                <div class = 'product-info' id = '${product.id}'>
                    <img class = 'thumbnail' src="${product.thumbnail || product.images[0]}"onerror="this.onerror=null; this.src='../images/default.jpg';">
                    <h5> ${product.title}</h5>
                    <p class = 'description'>${description}...</p>
                    <span class = 'priceAndRating'><b>$${product.price}</b> <span><i class="fa-solid fa-star" style="color: #FFD43B;"></i>${product.rating}</span></span>
                </div>    
                <div class = 'btnBox'></div>
            </div>
            `
        productContainer.innerHTML += card
    })
    quantity(storageManager(null, 'select'))
    
    if(app.initProductDetails('buy')){
        const closeBtn = popUp.querySelector('.btn-close')
        if(closeBtn){
            closeBtn.addEventListener('click', () => {
                document.body.style.overflowY = 'auto'
                popUp.style.display = 'none'
                Fetch()
            })
        }
    }
    delate()

}





function quantity(data){
    const btnBox = productContainer.querySelectorAll(".btnBox")
    btnBox.forEach((box, i) => {
        box.innerHTML = ''
        box.innerHTML += `
            <button id = '${data.id}' class = 'cartBtn'>Buy </button>
            <span class = 'quantity'><b class = 'minus' id = '${data[i].id}'>-</b> ${data[i].count} <b class = 'plus' id = '${data[i].id}'>+</b></span>
        `
    })
    minus(data)
    plus(data)

}



function minus(data){
    let minusBtn = document.querySelectorAll(".minus")
    minusBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            data.forEach(item => {
                if(item.id == btn.id){
                    if(item.count > 1){
                        item.count -= 1
                        localStorage.setItem("myData", JSON.stringify(data))
                        quantity(storageManager(null, 'select'))
                    }
                }
            })
        })
    })  
}




function plus(data){
    let plusBtn = document.querySelectorAll(".plus")
    plusBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            data.forEach(item => {
                if(item.id == btn.id){
                    item.count += 1
                    localStorage.setItem("myData", JSON.stringify(data))
                    quantity(storageManager(null, 'select'))
                }
            })
        })
    })

}


function delate(){
    const closeBtn = document.querySelectorAll('.cartDelate')
    closeBtn.forEach(btn => {
        btn.addEventListener('click', () => {
            let data = JSON.parse(localStorage.getItem('myData')) || []
            data = data.filter(item => item.id !== Number(btn.id))
            localStorage.setItem('myData', JSON.stringify(data))
            Fetch()
        })
    })
}

const bars = document.querySelector('.bars')
const menu = document.querySelector('.menu')
bars.addEventListener('click', () => {
    menu.classList.toggle('activeMenu')
})
