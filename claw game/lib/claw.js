
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
let isVideo = false;
let model = null;
let center = 0;
let mover = 0;
let claw;
let stopMovingClaw = false
let toy;

function startVideo() {
  handTrack.startVideo(video).then(function (status) {
    console.log("video started", status);
    if (status) {
      isVideo = true;
      runDetection();
    }
  });
}

//Create a Pixi Application
let app = new PIXI.Application({width: 1000, height: 700});

// Load the model.
handTrack.load(modelParams).then((lmodel) => {
  model = lmodel;
});

startVideo();

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
app.renderer.autoResize = true;
app.renderer.backgroundColor = 0x231919;

//loading image into the app
PIXI.loader
  .add(["assets/claw.svg", "assets/plushie.svg"])
  .load(setup);

function setup() {
  claw = new PIXI.Sprite(
    PIXI.loader.resources["assets/claw.svg"].texture);
  toy = new PIXI.Sprite(
    PIXI.loader.resources["assets/plushie.svg"].texture);
  app.stage.addChild(claw);
  app.stage.addChild(toy);
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
   toy.x = row * row2;
   toy.y = col * col2;
   toy.scale.x = 0.4;
   toy.scale.y = 0.4;
}


app.stage.addChild(claw);
//running hand-detection and moving claw with hand
function runDetection() {
  model.detect(video).then((predictions) => {
   
   model.renderPredictions(predictions, canvas, context, video);
    
    if (predictions.length != 0 && predictions[0].label === 'open' && !stopMovingClaw)
    {	center = predictions[0].bbox[0] + (predictions[0].bbox[2] / 2)
        mover = document.body.clientWidth * (center / video.width);
          console.log("mover:", mover, "center:", center);
          claw.x = mover;
        }
    if (predictions.length != 0 && predictions[0].label === 'closed')
    { if (claw.y <= -760){
    	extractToy();
      stopMovingClaw = true;
    }
    }

    if (isVideo) {
      requestAnimationFrame(runDetection);
    }
  });
}


function extractToy(){
  console.log(claw.y);
  claw.vy = 20;
  //Applying the velocity values to the claw's position to make it move
  claw.y += claw.vy;
  //if(hitTestRectangle(claw, toy))
}
