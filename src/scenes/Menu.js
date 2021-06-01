class Menu extends Phaser.Scene
{
    constructor()
    {
        super("menuScene");
    }

    preload()
    {
        this.load.audio('squeak','./assets/squeak.wav');
        this.load.audio('place','./assets/place.wav');
        this.load.audio('bell','./assets/bell.wav');
        this.load.audio('meow0','./assets/meow0.wav');
        this.load.audio('meow1','./assets/meow1.wav');
        this.load.audio('meow2','./assets/meow2.wav');
        this.load.audio('meow3','./assets/meow3.wav');
        this.load.audio('meow4','./assets/meow4.wav');
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