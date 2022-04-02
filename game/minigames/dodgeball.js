class DodgeballScene extends Phaser.Scene {
    constructor() {
        super('dodgeball');
        console.log('constructing dodgeball')
    }
    
    preload() {
        console.log('preloading dodgeball')
    }

    create() {
        console.log('creating dodgeball')
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player = createPlayer(this);

        this.add.text(400, 16, 'Mini Game', {fontSize: '32px', fill: '#000'});
        this.timerText = this.add.text(800, 16, '5s', {fontSize: '32px', fill: '#000'})

        this.myTimer = this.time.addEvent({
            delay: 5000,
            callback: () => {

            },
            repeat: 0
            
        });

    }

    update(time, dt) {
        this.player.update(time, dt);
        var secondsRemaining = this.myTimer.getRemainingSeconds();
        if(secondsRemaining <= 0) {
            this.scene.stop()
            this.scene.resume('MainScene')
        }
        else {
            this.timerText.setText(`${secondsRemaining.toFixed(0)}s`)
        }
    }
}