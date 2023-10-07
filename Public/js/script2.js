const carousel = document.querySelector('.carousel');
const arrowbtn = document.querySelectorAll('.wrapper box-icon');
const firstCardWidth = carousel.querySelector(".card").offsetWidth;

let isDragging = false, startX, startScrollLeft;

arrowbtn.forEach(btn => {
    btn.addEventListener("click", () => {
        // console.log(btn.id)
        carousel.scrollLeft += btn.id === "left" ?  -firstCardWidth : firstCardWidth;
    })
})

const dragStart = (e)=>{
    isDragging = true;
    carousel.classList.add("dragging")
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e)=>{
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft -  (e.pageX - startX)
    // console.log(e.pageX);
}

const dragStop = () =>{
    isDragging = false;
    carousel.classList.remove("dragging")
}

carousel.addEventListener('mousedown', dragStart)
carousel.addEventListener('mousemove', dragging)
carousel.addEventListener('mouseup', dragStop)