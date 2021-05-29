const swup = new Swup();

const image1 = document.getElementById("image1");
const nextBtn = document.querySelector("#Next");
const prevBtn = document.querySelector("#Prev");

// const url = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.KLjz1oTxsQDllOw8a6iFgAHaHZ%26pid%3DApi&f=1"
// image0.setAttribute('href', url)

//get image urls for games
const gameCovers = [
    "../assets/DUCKHUNT.png",
    "../assets/whack.png",
    "../assets/hops.png",
    "../assets/clawed.png"
]

// let url = gameCovers[1]
// image1.setAttribute('href', url)
let currentIndex = 0;

nextBtn.addEventListener("click", () => {
    currentIndex += 1
    let url = gameCovers[currentIndex % gameCovers.length]
    image1.setAttribute('href', url)

})

prevBtn.addEventListener('click', () => {
    currentIndex -= 1;
    if(currentIndex < 0) {
        currentIndex = 3
    }
    let url = gameCovers[currentIndex % gameCovers.length]
    image1.setAttribute('href', url)
})





