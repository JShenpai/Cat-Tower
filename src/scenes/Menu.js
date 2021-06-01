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

        this.load.image('mainMenu','./assets/mainMenu.jpg');
    }

    create()
    {
        //menu screen
        this.add.tileSprite(0,0,800,800,'mainMenu').setOrigin(0,0);

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