
// Canvas State Variables
canvas = {
    ctx: undefined,
    height: undefined,
    width: undefined,
    mouseX: 0,
    mouseY: 0,
    mouseDown: false,
    mouseDownX: 0,
    mouseDownY: 0,
    keysDown: {},
    drawMode: "stroke",
    buffers: [],
    activeBuffer: 0,
}

// Canvas Setup function
canvas.setup = function () {
    // extract canvas object and set attributes correctly
    
    this.buffers.push(document.getElementById("canvasArea1").getContext("2d"));
    this.buffers.push(document.getElementById("canvasArea2").getContext("2d"));
    this.ctx = this.buffers[this.activeBuffer];
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    document.getElementById("canvasArea1").width = this.width;
    document.getElementById("canvasArea1").height = this.height;
    document.getElementById("canvasArea2").width = this.width;
    document.getElementById("canvasArea2").height = this.height;

    // Start listeners
    this.startListeners();

    // Complete custom setup
    this.setupFunction();
}

//call in setup to use double buffering in your program
canvas.activateDoubleBuffer = function()
{
    activeBuffer = 1;
}

// Set the drawing mode to solid fill or border stroke
canvas.setDrawMode = function(mode = "stroke") {
    this.drawMode = (mode === "fill")? "fill" : "stroke";
};

// Set the color of the shape(s) for drawing
canvas.setColor = function(color) {
    
    this.buffers[1].fillStyle = color;
    this.buffers[0].fillStyle = color;
    this.buffers[1].strokeStyle = color;
    this.buffers[0].strokeStyle = color;

};

// Sets the thickness of the line of the shapes in strokes
canvas.setLineThickness = function(width = 1) {

    this.buffers[1].lineWidth = width;
    this.buffers[0].lineWidth = width;
    
};

// Draws the shape according to the drawMode(solid fill or border stroke style)
canvas.draw = function() {
    if(this.drawMode === "stroke"){
        this.ctx.stroke();
    } else {
        this.ctx.fill();
    }
}

// Draws line from (x1, y1) to (x2, y2)
canvas.drawLine = function(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.draw();
}

// Draws circle with center (x, y) and radius r
canvas.drawCircle = function(x1, y1, r) {
    this.ctx.beginPath();
    this.ctx.arc(x1, y1, r, 0, 2 * Math.PI);
    this.draw();
}

// Draws rectangle with top left corner as (x, y) and of dimensions width * height
canvas.drawRectangle = function(x, y, width, height) {
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.draw();
}

//Draws Ellipse 
canvas.drawEllipse = function(x, y, radiusX, radiusY, angle, startAngle, endAngle){
    var temp = 0;
    if(radiusY > radiusX){
        temp = radiusX;
        radiusX = radiusY;
        radiusY = temp;
    }
    
    endAngle = (endAngle/180.0)*Math.PI;
    this.ctx.beginPath();
    this.ctx.ellipse(x, y, radiusX, radiusY, angle, startAngle, endAngle, true);
    this.draw();
    this.ctx.closePath();
}

// Draws <message> at (x, y) 
canvas.drawText = function(x, y, message, fontSize = 30) {
    this.ctx.font = fontSize + "px Arial";
    this.ctx.fillText(message, x, y);
}

// Clear canvas
canvas.clear = function() {

    this.buffers[1].clearRect(0, 0, this.width, this.height);
    this.buffers[0].clearRect(0, 0, this.width, this.height);
    
}

//update the canvas to display changes made( use only with double buffering).
canvas.update = function(){

    this.buffers[1 - this.activeBuffer].canvas.style.visibility = 'hidden';
    this.buffers[this.activeBuffer].canvas.style.visibility = 'visible';
    this.activeBuffer = 1 - this.activeBuffer;

    this.buffers[this.activeBuffer].clearRect(0, 0, this.width, this.height);    
    this.ctx = this.buffers[this.activeBuffer];

}

// Function which will setup calling of canvas.mainFunction every <timeStep> milliseconds
canvas.startMain =  function(timeStep = 50) {
    setInterval(this.mainFunction, timeStep);
}

// Will start event listeners
// An event listener is a procedure or function in a computer program that waits for an event to occur. 
// Examples of an event are the user clicking or moving the mouse, pressing a key on the keyboard
canvas.startListeners = function () {

    window.addEventListener('mousemove', (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        this.mouseMoveCallback(e);
    });

    window.addEventListener("mousedown", () => {
        this.mouseDownX = this.mouseX; 
        this.mouseDownY = this.mouseY; 
        this.mouseDown = true;
        this.mouseDownCallback();
    });

    window.addEventListener("mouseup", () => { 
        this.mouseDown = false;
        this.mouseUpCallback();
    });

    window.addEventListener('keyup', (e) => {
        console.log(e.code + " was released" );
        this.keysDown[e.code] = false;
        this.keyUpCallback(e);
    });

    window.addEventListener('keydown', (e) => {
        console.log(e.code + " was pressed" );
        this.keysDown[e.code] = true;
        this.keyDownCallback(e);
    });
}

// Checks if keyboard key is pressed. Example KeyA for A. 
canvas.isKeyDown = function(key) {
    return this.keysDown[key] == true;
}


// Functions Users Can Override in index.html

// Main function which is called every <timeStep> milliseconds when canvas.startMain() is called
canvas.mainFunction = function () {
    console.log("Dummy Main Function - Override canvas.mainFunction");
}

// Custom Setup function for setting up global variables
canvas.setupFunction = function() {
    console.log("Dummy Setup Function - Override canvas.setupFunction");
}

// Called when key is pressed
canvas.keyDownCallback = function (e) {
    console.log("Dummy KeyDownCallback - Override canvas.KeyDownCallback");
}

// Called when key is released
canvas.keyUpCallback = function (e) {
    console.log("Dummy keyUpCallback - Override canvas.keyUpCallback");
}

// Called when mouse is pressed
canvas.mouseDownCallback = function () {
    console.log("Dummy mouseDownCallback - Override canvas.mouseDownCallback");
}

// Called when mouse is released
canvas.mouseUpCallback = function () {
    console.log("Dummy mouseUpCallback - Override canvas.mouseUpCallback");
}

// Called when mouse is moved
canvas.mouseMoveCallback = function (e) {
    // console.log("Dummy mouseMoveCallback - Override canvas.mouseMoveCallback");
}


// This function is used to display any image on the canvas
canvas.drawImg=function(imgPath,x,y,width=-1,height=-1){
    var img = new Image;
    img.src = imgPath;
    if(width!=-1&&height!=-1)
    {
        img.onload = ()=>{
            this.ctx.drawImage(img,x, y,width,height);
        };
    }
    else{
        img.onload =()=>{
            this.ctx.drawImage(img,x, y);
        };
    }
}
