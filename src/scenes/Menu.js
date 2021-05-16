class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    preload()
    {
        this.load.audio('squeak','./assets/squeakTEMP.wav');
        this.load.audio('place','./assets/placeTEMP.wav');
    }

    create()
    {
        //placeholder title text
        this.add.text(20, 20, "Cat Tower Main Menu");
        this.add.text(20, 60, "Press SPACE to begin");

        //declare input variables
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update()
    {
        //proceed to play scene
        if(Phaser.Input.Keyboard.JustDown(keySPACE))
        {
            this.scene.start('playScene');
        }
    }
}