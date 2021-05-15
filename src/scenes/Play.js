class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    preload()
    {
        //load sprites
        this.load.image('player','./assets/tempPlayer.png');
        this.load.image('background', './assets/tempBackground.png');
    }

    create()
    {
        //create background sprite
        this.bg = this.add.tileSprite(0,0,800,800,'background').setOrigin(0,0);

        //create object for pointer position coordinates
        this.target = new Phaser.Math.Vector2();

        //placeholder title text
        this.add.text(20, 20, "Cat Tower Play");

        //player sprite placement
        this.player = this.physics.add.sprite(game.config.width/2,game.config.height/2,'player').setOrigin(0,0);

        //movement mechanic, move towards cursor position at time of left click
        this.input.on('pointerdown', function (pointer)
        {

            this.target.x = pointer.x;
            this.target.y = pointer.y;

            this.physics.moveToObject(this.player,pointer,500);
        },this);
    }

    update()
    {

        //stop player once they come within 4 pixels of position
        this.distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.target.x, this.target.y)
        {
            if(this.distance < 4)
            {
                this.player.body.reset(this.target.x,this.target.y);
            }
        }
    }
}