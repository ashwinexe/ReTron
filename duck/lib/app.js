
        //this gets our canvas id and stores it in const canvas
        const canvas = document.getElementById('mycanvas');

        //this creates the PIXI app
        let app = new PIXI.Application({ 
            view: canvas,
            width: window.innerWidth,
            height: window.innerHeight
            // width: 256,
            // height: 256
        });

        //this changes bg color
        // app.renderer.backgroundColor = 0x77d0f3;

        //this imports image as texture (webGL can render textures)
        const texture_bird = PIXI.Texture.from('assets/images/duck.svg');

        //this saves the texture as sprite image
        const img_duck = new PIXI.Sprite(texture_bird);

        //to change dimensions
        img_duck.scale.x = 0.5;
        img_duck.scale.y = 0.5;

        //this shows the object (sprite in this case) to the stage 
        app.stage.addChild(img_duck)

        //this is used to change location of duck sprite
        img_duck.x = app.renderer.width / 3;
        img_duck.y = app.renderer.height;
        img_duck.anchor.x = 0.5;
        img_duck.anchor.y = 0.5;

        //this adds animation
        app.ticker.add(animate);

        //this is the defination of animation
        function animate() {
            img_duck.x += 1;
            img_duck.y -= 1;
        }
