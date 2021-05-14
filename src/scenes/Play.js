class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    

    preload()
    {
        this.load.image('player','./assets/tempPlayer.png');
    }

    create()
    {
        this.target = new Phaser.Math.Vector2();
        this.add.text(20, 20, "Cat Tower Play");
        this.player = this.physics.add.sprite(game.config.width/2,game.config.height/2,'player').setOrigin(0,0);
        /*
        this.input.on('pointerdown', function (pointer) 
        {
            this.add.image(pointer.x, pointer.y, 'player');
        }, this);
        */
        this.input.on('pointerdown', function (pointer)
        {

            this.target.x = pointer.x;
            this.target.y = pointer.y;

            this.physics.moveToObject(this.player,pointer,500);
        },this);
    }

    update()
    {
        this.distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.target.x, this.target.y)
        {
            if(this.distance < 4)
            {
                this.player.body.reset(this.target.x,this.target.y);
            }
        }
    }
}