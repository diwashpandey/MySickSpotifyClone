const box1 = document.querySelector(".box-1")
const revealer = document.querySelector(".revealer")

const modeBox = document.querySelector(".modebox")
const sunIcon = document.querySelector(".sun-icon")
const moonIcon = document.querySelector(".moon-icon")


function revealBox1() {
    console.log("clicked")
    revealer.classList.toggle("on-reveal")
    box1.classList.toggle("box-1-revealed")
}

function changeTheme(){
    if(moonIcon.classList.contains('theme-active')){
        document.body.classList.add('light_active')
        moonIcon.classList.remove('theme-active')
        sunIcon.classList.add('theme-active')
    }
    else if(sunIcon.classList.contains('theme-active')){
        document.body.classList.remove('light_active')
        sunIcon.classList.remove('theme-active')
        moonIcon.classList.add('theme-active')
    }
    else{
        alert("Some error has occured :(")
    }
}

modeBox.addEventListener('click', changeTheme)