var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    backgroundColor: "#ffffff",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [MainScene, GUIScene, DodgeballScene]
};

var game = new Phaser.Game(config);
