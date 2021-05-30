
//declaractions
let modelParams = {
  flipHorizontal: true,   
  imageScaleFactor: 0.7,  
  maxNumBoxes: 20,        
  iouThreshold: 0.5,      
  scoreThreshold: 0.79,    
}


const video = document.querySelector("#myvid");
const canvas = document.querySelector("#cnv");
const context = canvas.getContext("2d");
const score = document.querySelector(".score")
const timer = document.querySelector('.timer')
const gameOverContainer = document.querySelector('.game-over')
const audio1 = document.querySelector('.audio1')
const audio2 = document.querySelector('.audio2')

let isVideo = false;
let model = null;
let center = 0;
let mover = 0;
let claw;
let stopMovingClaw = false
let toy;
let texture1;
let texture2;
let closedClaw;
let calc = 0;
let random = 1;
let plushies = [];
// let gameOver = false;

function gameOver() {
  video.pause();
  gameOverContainer.classList.add('show')
  document.querySelector('.final-score').textContent = calc;
  audio1.pause();
  audio2.play();
}

function startVideo() {
  handTrack.startVideo(video).then(function (status) {
    console.log("video started", status);
    if (status) {
      isVideo = true;
      runDetection();
    }
  });
}



//check for collision
function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occurring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};


//Create a Pixi Application
let app = new PIXI.Application({width: 1000, height: 700});

// Load the model.
handTrack.load(modelParams).then((lmodel) => {
  model = lmodel;
});

//countdown timer
let timeoutHandle;
function countdown(minutes) {
    var seconds = 60;
    var mins = minutes
    function tick() {
        // var counter = document.getElementById("timer");
        var current_minutes = mins-1
        seconds--;
        if(seconds == 0 && current_minutes == 0) {
          gameOver()
        }
        timer.innerHTML =
        current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);

        
        
        if( seconds > 0 ) {
            timeoutHandle=setTimeout(tick, 1000);
        } else {
 
            if(mins > 1){
 
              
               setTimeout(function () { countdown(mins - 1); }, 1000);
 
            }
        }
    }
    tick();
}
 


startVideo();

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
app.renderer.autoResize = true;
app.renderer.backgroundColor = 0x231919;

//loading image into the app
PIXI.loader
  .add(["assets/cc.svg", "assets/plushie.svg", "assets/claw.svg", "assets/back_2.png", "assets/blahaj.svg", "assets/bunny.svg", "assets/teddy.svg"])
  .load(setup);






function setup() {

   plushies = [
    "assets/blahaj.svg", "assets/bunny.svg", "assets/teddy.svg"
  ]



  texture1 = PIXI.Texture.from('assets/claw.svg');
  texture2 = PIXI.Texture.from('assets/cc.svg');

  claw = new PIXI.Sprite(
    PIXI.loader.resources["assets/claw.svg"].texture);
  toy = new PIXI.Sprite(
    PIXI.loader.resources[plushies[random]].texture);
  const background = new PIXI.Sprite(
    PIXI.loader.resources["assets/back_2.png"].texture);
  


    background.anchor.x = 0;
    background.anchor.y = 0;
    
    background.position.x = 0;
    background.position.y = 0;
    background.scale.x = 0.72
    background.scale.y = 2;
    app.stage.addChild( background );

 
  app.stage.addChild(claw);
  app.stage.addChild(toy);

  //start timer
  countdown(1)

  //play audio
   audio1.play()
  // app.stage.addChild(closedClaw);
  placeToy();
  claw.y = -1250;
  claw.scale.x = 0.5;
  claw.scale.y = 0.5;
  claw.vy = 0;
}

function placeToy(){
   let col = Math.floor(Math.random()*7);
   let row = Math.floor(Math.random()*7);
   let col2 = Math.floor(Math.random() * 31) + 50;
   let row2 = Math.floor(Math.random() * 31) + 50;
   toy.x = row * row2 + 40;
   toy.y = col * col2 + 170;
   toy.scale.x = 0.12;
   toy.scale.y = 0.12;
 
   

}

function makeANewPlushie() {
  toy.destroy();
    
  random = Math.floor(Math.random() * 3)
 
  // score.textContent = calc;
  claw.y = -1250
  toy = new PIXI.Sprite(
    PIXI.loader.resources[plushies[random]].texture);

  app.stage.addChild(toy)
  placeToy();
  stopMovingClaw = false
  
  console.log("BAM!!")
}


function runDetection() {
  model.detect(video).then((predictions) => {
   
   model.renderPredictions(predictions, canvas, context, video);


   
    if (predictions.length != 0 && predictions[0].label === 'open' && !stopMovingClaw)
    {	center = predictions[0].bbox[0] + (predictions[0].bbox[2] / 2)
        mover = document.body.clientWidth * (center / video.width);
          console.log("mover:", mover, "center:", center);
          claw.x = mover;
          claw.texture = texture1;
    }

    else if (predictions.length != 0 && predictions[0].label === 'open' && stopMovingClaw)
    {
      claw.texture = texture1;     
    }

    else if ((predictions.length != 0 && predictions[0].label === 'closed') || stopMovingClaw)
    { if (claw.y <= -760){

    	extractToy();
      stopMovingClaw = true;
    } else{
      
      // toy.destroy();
    
    
      calc -= 2
      score.textContent = calc
     makeANewPlushie()
    }
    }else {

    }

    if (isVideo) {
      requestAnimationFrame(runDetection);
    }
  });

  if(hitTestRectangle(claw, toy)) {
    // toy.tint('#000000')
    // toy.destroy();
    
    
      calc += 10
      score.textContent = calc;
      makeANewPlushie();
    
  }
}


function extractToy(){
  console.log(claw.y);
  // changeState();
  claw.vy = 20;
  //Applying the velocity values to the claw's position to make it move
  claw.y += claw.vy;
  claw.texture = texture2;
  //if(hitTestRectangle(claw, toy))
}
