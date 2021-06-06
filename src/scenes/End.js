class End extends Phaser.Scene
{
    constructor()
    {
        super("endScene");
    }

    preload()
    {
        this.load.image('gameOver','./assets/gameOver.jpg');
    }

    create()
    {
        console.log("GAME OVER");
        this.add.text(20, 20, "Cat Tower Game Over");
        this.add.tileSprite(0,0,800,800,'gameOver').setOrigin(0,0);
    }
}