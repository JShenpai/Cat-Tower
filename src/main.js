let config = 
{
    type: Phaser.CANVAS,
    width: 800,
    height: 800,
    scene: [Cutscene1, Cutscene2, Cutscene3, Menu, Play, End],
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