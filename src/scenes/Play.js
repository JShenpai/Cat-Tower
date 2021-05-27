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
        this.load.image('object','./assets/tempObject.png');
        this.load.image('enemy','./assets/tempEnemy.png');
        this.load.image('maintower','./assets/tempTower.png');
    }

    create()
    {
        //create background sprite
        this.bg = this.add.tileSprite(0,0,800,800,'background').setOrigin(0,0);

        //create object for pointer position coordinates
        this.target = new Phaser.Math.Vector2();

        //placeholder title text
        this.add.text(20, 20, "Cat Tower Play");
        this.add.text(20, 40, "LEFT CLICK to move, SPACE to place object");

        //tower sprite placement
        this.mainTower = this.physics.add.sprite(game.config.width/2,game.config.height / 2,'maintower').setOrigin(0,0);

        //enemy sprite placement (temporary?)
        this.enemy = this.physics.add.sprite(game.config.width / 4,game.config.height / 4,'enemy').setOrigin(0,0);

        //player sprite placement
        this.player = this.physics.add.sprite(game.config.width/2,game.config.height * 3/4,'player').setOrigin(0,0);

        //movement mechanic, move towards cursor position at time of left click
        this.input.on('pointerdown', function (pointer)
        {
            this.sound.play('squeak', {volume: 0.33});
            this.target.x = pointer.x;
            this.target.y = pointer.y;

            this.physics.moveToObject(this.player,pointer,500);
        },this);

        //define other keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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

        

        //place object at player position when pressing space (if they are not moving)
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.distance < 4) {
            this.object1 = this.physics.add.sprite(this.player.x + (this.player.width / 4), this.player.y - (this.player.height * 3/4), 'object').setOrigin(0,0);
            this.sound.play('place', {volume: 0.33});

            //object collision
            this.physics.add.collider(this.player, this.object1, this.decelerate, null, this);
            this.physics.add.collider(this.enemy, this.object1);

            this.radius = Phaser.Math.Distance.Between(this.enemy.x, this.enemy.y, this.object1.x, this.object1.y)
            {
                if(this.radius < 75)
                {
                    this.physics.moveToObject(this.enemy, this.object1, 100);
                }
            }
            console.log(this.radius);
        }

        
    }

    //deceleration function for ball object
    decelerate(player, object)
    {
        object.setDamping(true);
        object.setDrag(0.35);
    }
}