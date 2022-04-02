class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        this.objects = {}
    }

    preload() {
    }

    create() {
        // Set bounds for world and camera
        this.physics.world.setBounds(100, 0, 800, 2000);
        this.cameras.main.setBounds(0,0,800, 2000);
    
        // Create input
        this.cursor = this.input.keyboard.createCursorKeys();
        this.cursor.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update(time, dt) {
    }
}
