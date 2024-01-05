const box1 = document.querySelector(".box-1")
const revealer = document.querySelector(".revealer")


function revealBox1(){
    console.log("clicked")
    revealer.classList.toggle("on-reveal")
    box1.classList.toggle("box-1-revealed")
}