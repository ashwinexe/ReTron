class Board {
    constructor (game) {
        this.game = game;
        this.stage = game.stage
        this.stage = game.stage
        this.canvas = game.canvas;
        this.score = 0;
        this.scoreContainer = new createjs.Container();
        this.miniDucksContainer = new createjs.Container();


        this.round = 1;
        this.createBackground();
        this.renderMiniDucks();
        this.flashMiniDucks = this.flashMiniDucks.bind(this);
        this.stopMiniDuckFlash = this.stopMiniDuckFlash.bind(this);
    }

    createBackground() {
    const background = new createjs.Bitmap('./assets/images/background.png');
    background.scaleX = 2.5;
    background.scaleY = 2;
    this.stage.addChild(background);
    this.stage.addChild(this.roundContainer)
    new Round(this);
  }


}