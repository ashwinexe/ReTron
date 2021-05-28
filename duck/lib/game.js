function play() {
    const startSound = new Audio('duck\assets\audio\start.mp3');
    startSound.currentTime = 0;
    startSound.volume = .1
    startSound.play()
}