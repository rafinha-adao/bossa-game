var config = {
    type: Phaser.CANVAS,
    width: 624,
    height: 624,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    backgroundColor: '#2C8B2A',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [Scene1, Scene2]
}

var game = new Phaser.Game(config);