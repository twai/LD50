function createPlayer(scene, x, y) {
    var sprite = scene.physics.add.sprite(x || 128, y || 128, 'green_guy_spritesheet');
    const spriteSize = {x: 256, y: 256};
    // sprite.setSize()
    sprite.scale = 0.25;
    sprite.anims.play('idle');
    sprite.setCollideWorldBounds(true);
    sprite.parent = scene;
    sprite.pressed = {right: 0, left: 0};

    sprite.allowVerticalMovement = true;
    sprite.allowMovement = true;

    // console.log(sprite.);

    if(scene.cursors == undefined) {
        console.warn('Parents creating a player should have cursor keys!');
    }
    

    sprite.update = function(time, dt) {
        var scene = sprite.parent;
        var speed = 500;
        var velocity = new Phaser.Math.Vector2(0, 0);
        // var velocity = {x: 0, y: 0};

        if(scene.cursors === undefined) {
            return;
        }

        if(this.allowMovement) {
            if(scene.cursors.left.isDown) {
                velocity.x -= 1;
            }
            if(scene.cursors.right.isDown) {
                velocity.x += 1;
            }
    
            if(this.allowVerticalMovement) {
                if(scene.cursors.up.isDown) {
                    velocity.y -= 1;
                }
                if(scene.cursors.down.isDown) {
                    velocity.y += 1;
                }
            }
        }




        if(velocity.length() > 0) {
            velocity.normalize();
            velocity.scale(speed);
        }
        this.setVelocity(velocity.x, velocity.y);

        if(this.getRightCenter().x >= 1000) {
            if(this.pressed.right === 0){
                this.pressed.right = 1;
                this.setSize(spriteSize.x / 1.25, spriteSize.y, true);
                this.anims.play('right_collide');
            }
            else if(this.pressed.right === 1 && scene.cursors.right.isDown) {
                this.pressed.right = 2;
                this.setSize(spriteSize.x / 1.6, spriteSize.y), true;
                this.anims.play('right_collide_hard');
            }
            else if(this.pressed.right === 2 && !scene.cursors.right.isDown) {
                this.setSize(spriteSize.x / 1.25, spriteSize.y, true);
                this.pressed.right = 1;
                this.anims.play('right_collide');
            }
        }
        else if (this.getLeftCenter().x <= 0) {
            if(this.pressed.left === 0){
                this.pressed.left = 1;
                this.setSize(spriteSize.x / 1.25, spriteSize.y, true);
                this.anims.play('left_collide');
            }
            else if(this.pressed.left === 1 && scene.cursors.left.isDown) {
                this.pressed.left = 2;
                this.setSize(spriteSize.x / 1.6, spriteSize.y, true);
                this.anims.play('left_collide_hard');
            }
            else if(this.pressed.left === 2 && !scene.cursors.left.isDown) {
                this.pressed.left = 1;
                this.setSize(spriteSize.x / 1.25, spriteSize.y, true);
                this.anims.play('left_collide');
            }
        }
        else if (this.pressed.right > 0 || this.pressed.left > 0) {
            this.pressed.right = 0;
            this.pressed.left = 0;
            this.setSize(spriteSize.x, spriteSize.y, true);
            this.anims.play('idle');
        }
    }

    return sprite;
}