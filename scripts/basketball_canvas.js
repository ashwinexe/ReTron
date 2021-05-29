

canvas = {
    ctx: undefined,height: undefined,width: undefined,mouseX: 0,mouseY: 0,mouseDown: false,mouseDownX: 0,  mouseDownY: 0,keysDown: {},drawMode: "stroke",buffers: [],activeBuffer: 0,
}

canvas.setup = function () {
    
    this.buffers.push(document.getElementById("canvasArea1").getContext("2d"));
    this.buffers.push(document.getElementById("canvasArea2").getContext("2d"));
    this.ctx = this.buffers[this.activeBuffer];
    this.height = window.innerHeight;
    this.width = window.innerWidth;

    document.getElementById("canvasArea1").width = this.width;
    document.getElementById("canvasArea1").height = this.height;
    document.getElementById("canvasArea2").width = this.width;
    document.getElementById("canvasArea2").height = this.height;

    this.startListeners();
    this.setupFunction();
}

canvas.activateDoubleBuffer = function(){
    activeBuffer = 1;
}

canvas.setDrawMode = function(mode = "stroke") {
    this.drawMode = (mode === "fill")? "fill" : "stroke";
};


canvas.setColor = function(color) {
    this.buffers[1].fillStyle = color;
    this.buffers[0].fillStyle = color;
    this.buffers[1].strokeStyle = color;
    this.buffers[0].strokeStyle = color;
};

canvas.setLineThickness = function(width = 1) {
    this.buffers[1].lineWidth = width;
    this.buffers[0].lineWidth = width;   
};

canvas.draw = function() {
    if(this.drawMode === "stroke"){
        this.ctx.stroke();
    } else {
        this.ctx.fill();
    }
}

canvas.drawLine = function(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.draw();
}

canvas.drawCircle = function(x1, y1, r) {
    this.ctx.beginPath();
    this.ctx.arc(x1, y1, r, 0, 2 * Math.PI);
    this.draw();
}

canvas.drawRectangle = function(x, y, width, height) {
    this.ctx.beginPath();
    this.ctx.rect(x, y, width, height);
    this.draw();
}

canvas.clear = function() {

    this.buffers[1].clearRect(0, 0, this.width, this.height);
    this.buffers[0].clearRect(0, 0, this.width, this.height);
    
}

canvas.startMain =  function(timeStep = 50) {
    setInterval(this.mainFunction, timeStep);
}

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


canvas.isKeyDown = function(key) {
    return this.keysDown[key] == true;
}



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

