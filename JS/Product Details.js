import storageManager from "./storage.js";
const popUp = document.querySelector('.popUp')
const popUpCont = document.querySelector('.popUpCont')



function skeleton(){
    popUpCont.innerHTML = `
        <div class="skeleton">
            <div class="skeletonImg">
                <img src="../images/image.png" alt="">
            </div>
            <div class="skeletonContent">
                <div class="skeletonText skeleton1"></div>
                <div class="skeletonText  skeleton2"></div>
                <div class="skeletonText  skeleton3"></div>
                <div class="skeletonText  skeleton4"></div>
            </div>
        </div>
    `
}

function cardDetails(btnInfo) {
    const card = document.querySelectorAll('.product-info')
    card.forEach(item => {
        item.addEventListener('click', () => {
            document.body.style.overflowY = 'hidden'
            popUp.style.display = 'flex'
            popUp.style.height = '100vh'
            skeleton()
            fetch(`https://dummyjson.com/products/${item.id}`)
            .then(res => {
                if(res.status == 200){
                    return res.json()
                }
            })
            .then(data => {
                detailsRender(data,btnInfo)
            });
        })
    })
}

function detailsRender(product, btnInfo){
    let brand = ''
    if(product.brand != undefined){
        brand = product.brand
    }else{
        brand = ''
    }
    let button
    let storage = storageManager(null, "select")
    if(btnInfo == 'addToCart'){   
        let existing = storage.find(item => product.id == item.id)
        button = `<button id = '${product.id}' class = 'cartBtn' >Add to Cart <img class = 'icon' src = '../images/black-cart.png' style = "width:30px; height:30px;"> </button>`
        if(existing){
            button = `<button id = '${product.id}' class = 'cartBtn' disabled >Added</button>`
        }
    }
    popUpCont.innerHTML = `
        <div id="carouselExampleIndicators" class="carousel slide popUp-image" data-bs-ride="carousel">
            <div class="carousel-indicators product-indicators"></div>

            <div class="carousel-inner product-carousel"></div>

            <button class="carousel-control-prev arrow left" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="custom-icon">&lsaquo;</span>
            </button>

            <button class="carousel-control-next arrow right" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="custom-icon">&rsaquo;</span>
            </button>
        </div>


        <div class = 'productInfo' >
            <h6 class = 'brand'>${brand}</h6>
            <h2>${product.title}</h2>
            <span class = 'price'><h4>$${product.price} </h4> <del>$${Math.round(product.price / (1 - product.discountPercentage / 100))}</del></span>
            <p class = 'discount'>Save ${Math.round(product.discountPercentage)}%</p>
            <span class = 'priceAndRating' style = 'width:fit-content; align-items:center;'><i class="fa-solid fa-star" style="color: #FFD43B;"></i>${product.rating}</span><br>
            <div class = 'btnBox' id = '${product.id}'>
                ${button}
            </div>
            <br>
            <ul class = 'policy'>
                <li class="trust-item">
                    <svg viewBox="0 0 24 24" class="check-icon">
                        <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>${product.returnPolicy}</span>
                </li>
                <li class="trust-item">
                    <svg viewBox="0 0 24 24" class="check-icon">
                        <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>${product.shippingInformation}</span>
                </li>
                <li class="trust-item">
                    <svg viewBox="0 0 24 24" class="check-icon">
                        <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>${product.warrantyInformation}</span>
                </li>
            </ul>


            <span><b class = 'fs-5'>Description: </b> ${product.description} </span><br>
            <span><b>Minimum Order Quantity: </b>${product.minimumOrderQuantity}</span><br>
            <br>
            <h6 class = 'd-flex gap-2'><img src = '../images/enlarge.png'> Dimensions</h6>
            <ul class = 'dimensions'>
                <li>Width: ${product.dimensions.width}cm</li>
                <li>Height: ${product.dimensions.height}cm</li>
                <li>Depth: ${product.dimensions.depth}cm</li>
                <li>Weight: ${product.weight}kg</li>
            </ul>            
        </div>
    `
    if(btnInfo == 'buy'){
        quantityBuyBtn()
    }
    const arrow = popUpCont.querySelectorAll('.arrow')
    if(product.images.length == 1){
        arrow.forEach(i => {
            i.style.opacity = '0'
        })
    }else{
        arrow.forEach(i => {
            i.style.opacity = '1'
        })
    }
    cartBtn(product,btnInfo)
    popUpImages(product.images)
}


function quantityBuyBtn(){
    let productInfo = document.querySelector('.productInfo')
    let btnBox = productInfo.querySelector('.btnBox')
    let product = storageManager(null, 'select')
    let index = product.find(item => item.id == btnBox.id)
    btnBox.innerHTML = `
        <button class = 'cartBtn'>
            Buy   
            <span class = 'quantity'>
                <b class = 'minus' id = '${btnBox.id }'>-</b>
                ${index.count}
                <b class = 'plus' id = '${btnBox.id }'>+</b>
            </span>
        </button>
    `
    detailsMinus(product)
    detailsPlus(product)
}



function detailsMinus(data){
    let productInfo = document.querySelector('.productInfo')
    let minusBtn = productInfo.querySelector(".minus")
    minusBtn.addEventListener('click', () => {
        data.forEach(item => {
            if(item.id == minusBtn.id){
                if(item.count > 1){
                    item.count -= 1
                    localStorage.setItem("myData", JSON.stringify(data))
                    quantityBuyBtn()
                }
            }
        })
    })  
}




function detailsPlus(data){
    let productInfo = document.querySelector('.productInfo')
    let plusBtn = productInfo.querySelector(".plus")
    plusBtn.addEventListener('click', () => {
        data.forEach(item => {
            if(item.id == plusBtn.id){
                item.count += 1
                localStorage.setItem("myData", JSON.stringify(data))
                quantityBuyBtn()
            }
        })
    })  
}




function popUpImages (images) {
    const imageBlock = document.querySelector(".product-carousel")
    const indicators = document.querySelector(".product-indicators")
    for(let i = 0; i < images.length; i++){
        imageBlock.innerHTML += `
            <div class="carousel-item ">
                <img src="${images[i]}" class="d-block w-90 h-100">
            </div>
        `
        indicators.innerHTML += `
            <button type="button" class = 'indicatorBtn' data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}"></button>
        `
    }
    let activeImg = imageBlock.querySelectorAll('.carousel-item')
    let indicatorBtn = indicators.querySelectorAll('.indicatorBtn')
    indicatorBtn[0].classList.add ('active')
    activeImg[0].classList.add('active')
}


function cartBtn(product, btnInfo) {
    const btn = popUpCont.querySelector(".cartBtn")
    if(btn){

        btn.addEventListener("click", () => {
            let storageData = storageManager(null, "select")
            if(!product){ 
                return
            }
            let existing = storageData.find(item => item.id == product.id)

            if(!existing) {
                let newProduct = { id:product.id, count: 1 }
                storageManager(newProduct, "insert")
            }
            btn.innerHTML = 'Added'
            detailsRender(product, btnInfo)
        })
    }

}




function initProductDetails(btnInfo){
  cardDetails(btnInfo)
  return true
}

export default {
  initProductDetails,
}

