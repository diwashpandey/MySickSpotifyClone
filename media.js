
//Getting Music Elements
var music = document.getElementById("music");

// Getting Media Kits
const playPauseBtn = document.querySelector(".play-pause-btns");
const previousBtn = document.getElementById("previous-btn");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress-bar");
const pauseIcon = document.querySelector(".pause-btn");
const playIcon = document.querySelector(".play-btn");
const currentMusicTitle = document.getElementById("music-title")
const currentMusicDuration = document.getElementById("music-duration")


// Getting Other Buttons
const hoveringPlayBtn = document.getElementById("hovering-play-btn");
const seeAllBtn = document.getElementById("see-all");

// Getting Elements
const cardContainer = document.querySelector(".card-container");


var musicData = {};
var currentMusic = 1;
var paused = true;

// class Responsive{
//     cardScroll(){

//     }
// }

class Graphics {
    opened = 0;

    createCards(number, musicTitle) {
        const card = document.createElement("li");
        const albumPhoto = document.createElement("img");
        const newPlayBtn = document.createElement("img");
        const title = document.createElement("h3");
        const discription = document.createElement("p");

        card.classList.add("card");
        card.classList.add(number);
        albumPhoto.classList.add("album-photo")
        newPlayBtn.classList.add("hovering-play-btn");

        albumPhoto.setAttribute("src", `./Equipments/Photoes/${number}.jpg`);
        newPlayBtn.setAttribute("src", "./Equipments/Icons/MusicPlayer/play.svg");

        title.innerHTML = musicTitle;
        discription.innerHTML = "Something about music about what it is about blah blah.";

        card.appendChild(newPlayBtn);
        card.appendChild(albumPhoto);
        card.appendChild(title);
        card.appendChild(discription);

        cardContainer.appendChild(card);

        newPlayBtn.addEventListener("click", player.playMusicFromCard)
    }

    static changeIcon() {
        if (!paused) {
            playIcon.classList.remove("play-active")
            pauseIcon.classList.add("play-active")
        }
        else {
            pauseIcon.classList.remove("play-active")
            playIcon.classList.add("play-active")
        }
    }

    extendCardContainer(){
        
        if(seeAllBtn.innerText=="See all"){
            this.opened = 1;
            cardContainer.classList.add("card-container-opened")
            cardContainer.classList.remove("card-container")
            seeAllBtn.innerText="See less";
        }
        else if(seeAllBtn.innerText=="See less"){
            cardContainer.classList.add("card-container")
            cardContainer.classList.remove("card-container-opened")
            seeAllBtn.innerText="See all";
        }
    }

    backAndForward(command){
        if(this.opened == 1){
            if (command == "back"){
                if(seeAllBtn.innerText=="See less"){
                    this.extendCardContainer()
                }
            }
            else if(command == "forward"){
                if(seeAllBtn.innerText=="See all"){
                    this.extendCardContainer()
                }
            }
        }
    }

    resetProgress(){
        setTimeout(()=>{
            progress.max = music.duration;
            progress.min = 0;
            console.log("max="+music.duration)
            console.log("min="+music.currentTime)
        },500)
        
    }

    updateDuration(){
        let time = Math.floor(music.currentTime);
        let minute = Math.floor(time/60);
        let seconds = time % 60;

        if (minute >=1 && minute<10){
            minute = `0${minute}`
        }
        if (minute==0){
            minute = "00"
        }
        if (seconds >=1 && seconds<10){
            seconds = `0${seconds}`
        }
        if (seconds==0){
            seconds = "00"
        }
        currentMusicDuration.innerHTML=`${minute}:${seconds}`

    }
}


class MusicPlayer extends Graphics {

    static playMusic() {
        super.changeIcon()
        music.play()
    }

    playPause() {
        if (playIcon.classList.contains("play-active")) {

            MusicPlayer.playMusic()
            playIcon.classList.remove("play-active")
            pauseIcon.classList.add("play-active")
        }
        else {
            paused = true;
            music.pause()
            pauseIcon.classList.remove("play-active")
            playIcon.classList.add("play-active")
        }
    }

    playMusicFromCard(event) {
        let number = event.target.parentElement.classList[1];
        currentMusic = parseInt(number);
        paused = false;
        MusicPlayer.updateMusic();
        MusicPlayer.playMusic();
    }

    fireNext() {
        if (currentMusic == Object.keys(musicData).length) {
            currentMusic = 0;
        }
        currentMusic = currentMusic + 1;
        paused = false;
        MusicPlayer.updateMusic()
        MusicPlayer.playMusic()
    }

    firePrevious() {
        if (currentMusic == 1) {
            currentMusic = Object.keys(musicData).length + 1;
        }
        currentMusic = currentMusic - 1;
        paused = false;
        MusicPlayer.updateMusic()
        MusicPlayer.playMusic()
    }

    static updateMusic() {
        currentMusicTitle.innerHTML = musicData[currentMusic];
        let url = `./Equipments/Music/${currentMusic}.mp3`
        music.removeAttribute("src")
        music.setAttribute("src", url)
        graphics.resetProgress()
    }

    changeCurrentTime(){
        paused = false;
        music.currentTime = progress.value;
        MusicPlayer.playMusic();
    }

}

async function getMusicData() {
    let a = await fetch("./Equipments/Music/data.json")
    let data = await a.json()
    return data;
}

const player = new MusicPlayer();
const graphics = new Graphics();


window.onload = ()=>{
    getMusicData().then((response) => {
        musicData = response;
        let length = Object.keys(musicData).length;
    
        for (let i = 1; i <= length; i++) {
            let title = musicData[i];
            graphics.createCards(i, title)
        }
        for (let i = 1; i <= length; i++) {
            let title = musicData[i];
            graphics.createCards(i, title)
        }
    }).then(player.updateMusic)
    .then(()=>{
        MusicPlayer.updateMusic();
    })
        .catch((error) => {
            alert("Some error has been ocured! You may not able to see full feature")
            console.log("The Error is: \n"+error)
        })
}

cardContainer.addEventListener("wheel",(e)=>{

    if(seeAllBtn.innerText=="See less"){
        
    }

    else{
        e.preventDefault()

        cardContainer.scrollLeft  += e.deltaY;
        console.log("called");
    }
    

})




if (music.play) {
    setInterval(() => {
        progress.value = music.currentTime
        graphics.updateDuration()
    }, 1000)
}

