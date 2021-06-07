class Cutscene1 extends Phaser.Scene
{
    constructor()
    {
        super("cutScene1");
    }

    preload()
    {
        this.load.image('intro1','./assets/intro1.jpg');

        this.load.audio('music','./assets/music.wav');
    }

    create()
    {
        //fade in
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        //cutscene 1 art
        this.add.tileSprite(0,0,800,800,'intro1').setOrigin(0,0);
        
        //text settings
        let textConfig = {
            fontFamily: 'Tahoma',
            fontSize: '22px'
        }

        this.add.text(20,20,"Press [SPACE] To Continue", textConfig);

        //declare input variables
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // play music
        let musicConfig = {
            loop: true,
            volume: 0.5
        }
        game.sound.stopAll();
        this.gameMusic = this.sound.add('music', musicConfig);
        if (!this.gameMusic.isPlaying) {
            this.gameMusic.play();
        }
    }

    update()
    {
        //proceed to play scene
        if(Phaser.Input.Keyboard.JustDown(keySPACE))
        {
            //fade out
            this.cameras.main.fadeOut(1000, 0, 0, 0);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                this.scene.start('cutScene2');
            });
        }
    }
}