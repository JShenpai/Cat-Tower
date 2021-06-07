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
            this.scene.start('menuScene');
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyR))
        {
            this.scene.start('playScene');
        }
    }
}