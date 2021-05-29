//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Graphics = PIXI.Graphics,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;

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

    const texture_duck = PIXI.Texture.from('assets/images/duck.svg');

    // an array to store all ducks
    ducks = [];

    //make duck
    let duck = new Sprite(texture_duck);

    //xOffset is point of first duck from left of screen
    // ket x = spacing * i  + xOffset;

    // give duck random x position
    let x = randomInt(0, app.stage.width = duck.width);

    // set duck's position
    duck.x = x;
    duck.y = app.renderer.height;

    duck.vy = speed * direction;

    //change direction for next blob
    direction *= -1;

    //pushing ducks in array
    ducks.push(duck);

    gameScene.addChild(duck);

    app.ticker.add(delta => gameLoop(delta));
}