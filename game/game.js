var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    backgroundColor: "#ffffff",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [MainScene, GUIScene, DodgeballScene, ArrowsScene, FadeScene]
};

var game = new Phaser.Game(config);
