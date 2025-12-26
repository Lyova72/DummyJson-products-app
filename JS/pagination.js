import fetch from "./fetch.js"

const pagination = document.querySelector('.pageNumber')

function page(length){ 
    if(pagination){
        pagination.innerHTML = ''
        for( let i = 1; i <= Math.ceil(length / 12); i++){
            pagination.innerHTML += `
                <span class="page">${i}</span>
            `
        }
        handlePagination(length)
    }
}
export default page




let x = 0;
function handlePagination(productLength) {
    let pageNumbers = document.querySelectorAll(".page");
    let page = JSON.parse(sessionStorage.getItem("page")) || 0;

    pageNumbers[Math.floor(page / 12)].classList.add("activePage");

    const next = document.querySelector(".next");
    const prev = document.querySelector(".prev");

    const SHIFT = 180; 

    let pageIndex = Math.floor(page / 12); 
    let group = Math.floor(pageIndex / 3); 
    x = -group * SHIFT;                     
    pageNumbers.forEach(p => {
        p.style.transform = `translateX(${x}px)`;
    });

    prev.addEventListener("click", () => {

        let pageIndex = page / 12;

        if (page > 0) {
            pageNumbers[pageIndex].classList.remove("activePage");
            page -= 12;
            let newIndex = page / 12;

            pageNumbers[newIndex].classList.add("activePage");
            sessionStorage.setItem("page", page);
            fetch();
        }

        let newIndex = page / 12;
        if (newIndex % 3 === 2) {
            x += SHIFT;
            pageNumbers.forEach(p => p.style.transform = `translateX(${x}px)`);
        }
    });

    next.addEventListener("click", () => {
        let pageIndex = page / 12;

        if (page < productLength - 12) {
            pageNumbers[pageIndex].classList.remove("activePage");
            page += 12;
            let newIndex = page / 12;

            pageNumbers[newIndex].classList.add("activePage");
            sessionStorage.setItem("page", page);
            fetch();
        }

        let newIndex = page / 12;
        if (newIndex % 3 === 0 && newIndex !== 0) {
            x -= SHIFT;
            pageNumbers.forEach(p => p.style.transform = `translateX(${x}px)`);
        }
    });
}
