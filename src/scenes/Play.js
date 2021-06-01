class Play extends Phaser.Scene
{
    constructor()
    {
        super("playScene");
    }

    preload()
    {
        //load sprites
        this.load.spritesheet('player', './assets/mouse.png', {frameWidth: 40, frameHeight: 40, startFrame: 0, endFrame: 1});
        this.load.image('background', './assets/background.png');
        this.load.image('object','./assets/ball.png');
        this.load.spritesheet('enemy', './assets/cat.png', {frameWidth: 40, frameHeight: 40, startFrame: 0, endFrame: 3});
        this.load.spritesheet('maintower', './assets/fishbowl.png', {frameWidth: 80, frameHeight: 80, startFrame: 0, endFrame: 7});
    }

    create()
    {
        //create background sprite
        this.bg = this.add.tileSprite(0,0,800,800,'background').setOrigin(0,0);

        //create object for pointer position coordinates
        this.target = new Phaser.Math.Vector2();

        //placeholder title text
        this.add.text(40, 40, "Cat Tower Play");
        this.add.text(40, 60, "LEFT CLICK to move, SPACE to place object");

        //tower sprite placement
        this.mainTower = this.physics.add.sprite(game.config.width/2 - 40,game.config.height / 2 - 40,'maintower').setOrigin(0,0);

        //player sprite placement
        this.player = this.physics.add.sprite(game.config.width/2,game.config.height * 3/4,'player').setOrigin(0,0);

        //movement mechanic, move towards cursor position at time of left click
        this.input.on('pointerdown', function (pointer)
        {
            this.sound.play('squeak', {volume: 0.25});
            this.target.x = pointer.x;
            this.target.y = pointer.y;

            this.physics.moveToObject(this.player,pointer,500);
        },this);

        //define other keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //enemy spawn timer
        this.timer = this.time.addEvent({ delay: 5000, callback: this.spawnEnemy, callbackScope: this, loop: true });

        this.object1 = false;
        this.spawn = false;

        //physics groups
        this.cats = this.physics.add.group();
        this.balls = this.physics.add.group();

        //number of balls and ball limit
        this.ballLimit = 5;
        this.ballNumber = 0;

        //ball limit increase timer
        this.limitTimer = this.time.addEvent({ delay: 5000, callback: this.increaseLimit, callbackScope: this, loop: true });

        // animation config
        this.anims.create({
            key: 'mouseanim',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 1, first: 0}),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'catanim',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 3, first: 0}),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'bowlanim',
            frames: this.anims.generateFrameNumbers('maintower', { start: 0, end: 7, first: 0}),
            frameRate: 7,
            repeat: -1
        });

        this.player.anims.play('mouseanim', true);
        this.mainTower.anims.play('bowlanim', true);
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
        if (Phaser.Input.Keyboard.JustDown(keySPACE) && this.distance < 4 && this.ballNumber < this.ballLimit) {
            this.object1 = this.physics.add.sprite(this.player.x + (this.player.width / 4), this.player.y - (this.player.height * 3/4), 'object').setOrigin(0,0);
            this.sound.play('place', {volume: 0.25});
            this.ballNumber++;

            //object collision
            this.physics.add.collider(this.player, this.object1, this.decelerate, null, this);
        }

        //radius to attract cats
        if (this.object1 && this.spawn) {
            this.radius = Phaser.Math.Distance.Between(this.spawn.x, this.spawn.y, this.object1.x, this.object1.y)
            {
                if(this.radius < 100)
                {
                    this.physics.moveToObject(this.spawn, this.object1, 100);
                    if (this.radius < 1) {
                        this.sound.play('bell', {volume: 0.05});
                    }
                }
            }
        }
    }

    //deceleration function for ball object
    decelerate(player, object)
    {
        object.setDamping(true);
        object.setDrag(0.35);
    }

    //spawn an enemy
    spawnEnemy()
    {
        var randmeow = Phaser.Math.Between(0,4);
        switch(randmeow) {
            case 0:
                this.sound.play('meow0', {volume: 0.25});
                break;
            case 1:
                this.sound.play('meow1', {volume: 0.25});
                break;
            case 2:
                this.sound.play('meow2', {volume: 0.25});
                break;
            case 3:
                this.sound.play('meow3', {volume: 0.25});
                break;
            case 4:
                this.sound.play('meow4', {volume: 0.25});
                break;
            case 1:
                console.log(randmeow);
                break;
        }

        var side = Phaser.Math.Between(0,3);
        switch(side)
        {
            case 0:
                //spawn on top of screen
                console.log('Top');
                this.spawn = this.physics.add.sprite(Phaser.Math.Between(0,game.config.width),game.config.height,'enemy').setOrigin(0,0);
                this.physics.moveToObject(this.spawn, this.mainTower, 25);
                this.spawn.anims.play('catanim', true);
                break;
            case 1:
                //spawn on right of screen
                console.log('Right');
                this.spawn = this.physics.add.sprite(game.config.width,Phaser.Math.Between(0,game.config.height),'enemy').setOrigin(0,0);
                this.physics.moveToObject(this.spawn, this.mainTower, 25);
                this.spawn.anims.play('catanim', true);
                break;
            case 2:
                //spawn on bottom of screen
                console.log('Bottom');
                this.spawn = this.physics.add.sprite(Phaser.Math.Between(0,game.config.width),0,'enemy').setOrigin(0,0);
                this.physics.moveToObject(this.spawn, this.mainTower, 25);
                this.spawn.anims.play('catanim', true);
                break;
            case 3:
                //spawn on left of screen
                console.log('Left');
                this.spawn = this.physics.add.sprite(0,Phaser.Math.Between(0,game.config.height),'enemy').setOrigin(0,0);
                this.physics.moveToObject(this.spawn, this.mainTower, 25);
                this.spawn.anims.play('catanim', true);
                break;
            default:
                //this should never happen
                console.log(side);
                break;
        }
    }

    increaseLimit() {
        this.ballLimit++;
    }
}