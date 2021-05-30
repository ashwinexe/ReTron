const swup = new Swup();

const image1 = document.getElementById("image1");
const nextBtn = document.querySelector("#Next");
const prevBtn = document.querySelector("#Prev");
const playBtn = document.querySelector('.play')




//get image urls for games
const gameCovers = [
    "../assets/DUCKHUNT.png",
    "../assets/whack.png",
    "../assets/hops.png",
    "../assets/clawed.png"
]

let currentIndex = 0;
playBtn.href = "/ReTron/duck/duck.html"
function setRoute(idx) {
    if(idx % 4 == 0) {
       playBtn.href = "/ReTron/duck/duck.html"
    }else if(idx % 4 == 1){
        playBtn.href = "/ReTron/Mole/mole.html"
    }else if(idx % 4 == 2){
        playBtn.href = "/ReTron/basketball/basketball.html"
    }else {
        playBtn.href = '/ReTron/claw game/claw.html'
    }
}

nextBtn.addEventListener("click", () => {
    
    currentIndex += 1
    setRoute(currentIndex)
    let url = gameCovers[currentIndex % gameCovers.length]
    image1.setAttribute('href', url)

})

prevBtn.addEventListener('click', () => {
    currentIndex -= 1;
    setRoute(currentIndex)
    if(currentIndex < 0) {
        currentIndex = 3
    }
    let url = gameCovers[currentIndex % gameCovers.length]
    image1.setAttribute('href', url)
})





