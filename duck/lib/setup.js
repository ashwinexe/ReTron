function setup {

    // make the game scene and add it to stage
    gameScene = new Container();
    app.stage.addChild(gameScene);

    //game over scene
    gameOverScene = new Container();
    app.stage.addChild(gameOverScene);
    gameOverScene.visible = false;

    //making ducks
    let numberOfDucks = 6,
    spacing = 48,
    xOffset = 150,
    speed = 1,
    direction = 1;

    // an array to store all ducks
    ducks = [];

    app.ticker.add(delta => gameLoop(delta));
}