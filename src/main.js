let config = 
{
    type: Phaser.CANVAS,
    width: 800,
    height: 800,
    scene: [Menu, Play],
    physics:
    {
        default: 'arcade',
        arcade:
        {
            debug: false
        }
    },
    fps: {
        target: 60,
        forceSetTimeOut: true
    }
}

let game = new Phaser.Game(config);

//reserve input variable names
let keySPACE;