
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
  .add(
    /*"assets/bar.png",
    "assets/back_1.png",
    "assets/back_2.png",*/
    "assets/claw.svg")
  .load(setup);

function setup() {
  claw = new PIXI.Sprite(
    PIXI.loader.resources["assets/claw.svg"].texture);
  app.stage.addChild(claw);
  claw.y = 30;
  claw.scale.x = 0.5;
  claw.scale.y = 0.5;
  claw.vy = 0;
}

app.stage.addChild(claw);
//running hand-detection and moving claw with hand
function runDetection() {
  model.detect(video).then((predictions) => {
   
   model.renderPredictions(predictions, canvas, context, video);
    
    if (predictions.length != 0 && predictions[0].label === 'open')
    {	center = predictions[0].bbox[0] + (predictions[0].bbox[2] / 2)
        mover = document.body.clientWidth * (center / video.width);
          console.log("mover:", mover, "center:", center);
          claw.x = mover;
        }
    if (predictions.length != 0 && predictions[0].label === 'closed')
    { if (claw.y <= 500){
    	extractToy();
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
}
