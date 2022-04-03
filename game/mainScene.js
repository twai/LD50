class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        console.log('preloading MainScene');
        this.load.spritesheet('portal', 'img/ss_portal.png', {frameWidth: 256, frameHeight: 256})
        this.load.spritesheet('green_guy_spritesheet', 'img/spritesheet2_centered.png', {frameWidth: 256, frameHeight: 256});
    }

    init_animations() {
        // PLAYER
        this.anims.create({
            key: 'idle',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('green_guy_spritesheet', {start: 0, end: 2}),
            frameRate: 5
        })
        this.anims.create({
            key: 'right_collide',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('green_guy_spritesheet', {start: 3, end: 5}),
            frameRate: 5
        })
        this.anims.create({
            key: 'right_collide_hard',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('green_guy_spritesheet', {start: 6, end: 8}),
            frameRate: 5
        })
        this.anims.create({
            key: 'left_collide',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('green_guy_spritesheet', {start: 9, end: 11}),
            frameRate: 5
        })
        this.anims.create({
            key: 'left_collide_hard',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('green_guy_spritesheet', {start: 12, end: 14}),
            frameRate: 5
        })

        // PORTAL
        this.anims.create({
            key: 'portal_idle',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('portal', {start: 0, end: 2}),
            frameRate: 5
        })
    }

    create() {
        console.log('Creating MainScene');

        this.init_animations();
        this.cursors =My.Utils.mapInput(this);
        console.log(this.cursors);

        // (( TEMPORARY ))
        // Add a portal we can use to go to a minigame
        this.portal = this.physics.add.staticSprite(400, 300, 'portal')
        this.portal.setBodySize(128, 128, true);
        this.portal.setDisplaySize(128, 128);
        
        this.portal.anims.play('portal_idle')

        // Create the player
        this.player = createPlayer(this);

        // Some text to show where we are
        this.add.text(400, 16, 'Main Game', {fontSize: '32px', fill: '#000'});

        // For debugging
        this.events.on('pause', () => {
            console.log('paused');
        });

        // Since we hid when pausing, we need to become visible again!
        this.events.on('resume', (scene, data) => {
            if(!this.scene.isVisible()) {
                this.scene.setVisible(true);
            }
        })
    }

    update(time, dt) {
        this.player.update(time, dt);

        // (( TEMPORARY ))
        // If we press space while overlapping the portal, start a minigame!
        if(this.cursors.space.isDown && this.physics.overlap(this.player, this.portal)) {
            this.scene.pause();
            this.scene.setVisible(false);
            this.scene.launch('dodgeball', {difficultyLevel: Phaser.Math.Between(1, 4)});
        }
    }
}
