
//Getting Music Elements
const music = document.getElementById("music");
const musicSrc = document.getElementById("mucic-source");

// Getting Media Kits
const playPauseBtn = document.querySelector(".play-pause-btns");
const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress-bar");
const pauseIcon = document.querySelector(".pause-btn");
const playIcon = document.querySelector(".play-btn");
const currentMusicTitle = document.getElementById("music-title")


// Getting Other Buttons
const hoveringPlayBtn = document.getElementById("hovering-play-btn");
const seeAllBtn = document.getElementById("see-all");

// Getting Elements
const cardContainer = document.querySelector(".card-container");


var musicData = {};
var currentMusic = 1;
var paused = false;


async function getMusicData(){
    let a = await fetch("./Equipments/Music/data.json")
    let data = await a.json()
    return data;
}



// This will create Card and append inside the card container.
function createCards(number, musicTitle){
    const card = document.createElement("li");
    const albumPhoto = document.createElement("img");
    const newPlayBtn = document.createElement("img");
    const title = document.createElement("h3");
    const discription = document.createElement("p");

    card.classList.add("card");
    card.classList.add(number);
    albumPhoto.classList.add("album-photo")
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

    newPlayBtn.addEventListener("click", playMusicFromCard)
}

function resetProgress(){
    progress.max = music.duration;
    progress.min = music.currentTime;
}

function updateMusic(){
    currentMusicTitle.innerHTML = musicData[currentMusic];
    let url = `./Equipments/Music/${currentMusic}.mp3`
    music.removeAttribute("src")
    music.setAttribute("src", url)
}

function changeIcon(){
    if(! paused){
        playIcon.classList.remove("play-active")
        pauseIcon.classList.add("play-active")
    }
    else{
        pauseIcon.classList.remove("play-active")
        playIcon.classList.add("play-active")
    }
}

const playMusic=()=>{
    changeIcon()
    music.play()
}

function playMusicFromCard(event){
    let number = event.target.parentElement.classList[1];
    currentMusic = parseInt(number);
    paused = false;
    updateMusic();
    playMusic();
}

function playPause(){
    if(playIcon.classList.contains("play-active")){
        
        playMusic()
        playIcon.classList.remove("play-active")
        pauseIcon.classList.add("play-active")
    }
    else{
        paused = true;
        music.pause()
        pauseIcon.classList.remove("play-active")
        playIcon.classList.add("play-active")
    }
}

function firePrevious(){
    console.log(`Current Music is`+currentMusic)
    if(currentMusic==1){
        currentMusic = Object.keys(musicData).length+1;
    }
    currentMusic = currentMusic-1;
    updateMusic()
    playMusic()
    
}

function fireNext(){
    console.log(`Current Music is`+currentMusic)
    console.log(typeof currentMusic)
    if(currentMusic==Object.keys(musicData).length){
        currentMusic = 0;
    }
    currentMusic = currentMusic+1;
    updateMusic()
    playMusic()
}

function changeTime(){
    music.currentTime = progress.value;
}


getMusicData().then((response)=>{
    musicData = response;
    let length = Object.keys(musicData).length;

    for (let i=1; i<=length; i++ ){
        let title = musicData[i];
        createCards(i, title)
    }
})
.then(()=>{
    let length = Object.keys(musicData).length;

    for (let i=1; i<=length; i++ ){
        let title = musicData[i];
        createCards(i, title)
    }
})
.then(updateMusic)
.catch((error)=>{
    alert("Some error has been ocured! You may not able to see full feature")
})


resetProgress()

if (music.play){
    setInterval(()=>{
        progress.value = music.currentTime
    },1000)
}

// Problem facing : Back cards not responding to buttons