var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    backgroundColor: "#ffffff",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 40 }
        }
    },
    scene: [MainScene, GUIScene]
};

var game = new Phaser.Game(config);
