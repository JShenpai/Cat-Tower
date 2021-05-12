let config = 
{
    type: Phaser.CANVAS,
    width: 800,
    height: 800,
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);