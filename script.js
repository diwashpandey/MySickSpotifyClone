
//Getting Music Elements
const music = document.getElementById("music");
const musicSrc = document.getElementById("mucic-source");

// Getting Media Buttons
const playPauseBtn = document.querySelector(".play-pause-btns");
const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress-bar");

// Getting Other Buttons
const hoveringPlayBtn = document.getElementById("hovering-play-btn");
const seeAllBtn = document.getElementById("see-all");

// Getting Elements
const cardContainer = document.querySelector(".card-container");


var musicData = {};
var currentMusic = 1;

async function getMusicData(){
    let a = await fetch("./Equipments/Music/data.json")
    let data = await a.json()
    return data;
}

getMusicData().then((response)=>{
    musicData = response;
    console.log(musicData)
})

// This will create Card and append inside the card container.
function createCards(number, musicTitle){
    const card = document.createElement("li");
    const albumPhoto = document.createElement("img");
    const newPlayBtn = document.createElement("img");
    const title = document.createElement("h3");
    const discription = document.createElement("p");

    card.classList.add("card");
    card.classList.add(number);
    newPlayBtn.classList.add("hovering-play-btn");

    albumPhoto.setAttribute("src",`./Equipments/Photoes/${number}.jpg`);
    newPlayBtn.setAttribute("src", "./Equipments/Icons/MusicPlayer/play.svg");

    title.innerHTML = musicTitle;
    discription.innerHTML = "Something about music about what it is about blah blah.";

    card.appendChild(newPlayBtn);
    card.appendChild(albumPhoto);
    card.appendChild(title);
    card.appendChild(discription);

    cardContainer.appendChild(card);
}