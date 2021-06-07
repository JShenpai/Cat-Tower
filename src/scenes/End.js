class End extends Phaser.Scene
{
    constructor()
    {
        super("endScene");
    }

    preload()
    {
        this.load.image('gameOver','./assets/gameOver.jpg');
    }

    create()
    {
        //fade in
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        console.log("GAME OVER");
        this.add.text(20, 20, "Cat Tower Game Over");
        this.add.tileSprite(0,0,800,800,'gameOver').setOrigin(0,0);

        //declare input variables
        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
    }

    update()
    {
        if(Phaser.Input.Keyboard.JustDown(this.keySPACE))
        {
            //fade out
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('menuScene');
            });
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyR))
        {
            //fade out
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('playScene');
            });
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyC))
        {
            //fade out
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('cutScene1');
            });
        }
    }
}