// Ball prefab
class Ball extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        // add object to existing scene
        scene.add.existing(this);
    }

    update() {
    }
}