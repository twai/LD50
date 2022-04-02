function createPlayer(scene) {
    var sprite = scene.physics.add.sprite(128, 128, 'green_guy_spritesheet');
    sprite.scale = 0.25;
    sprite.anims.play('idle');
    sprite.setCollideWorldBounds(true);
    sprite.parent = scene;
    sprite.pressed = {right: 0, left: 0};

    if(scene.cursors == undefined) {
        console.warn('Parents creating a player should have cursor keys!');
    }

    sprite.update = function(time, dt) {
        var scene = sprite.parent;
        var speed = 500;
        var velocity = {x: 0, y: 0};

        if(scene.cursors === undefined) {
            return;
        }

        if(scene.cursors.left.isDown) {
            velocity.x -= speed;
        }
        if(scene.cursors.right.isDown) {
            velocity.x += speed;
        }
        if(scene.cursors.up.isDown) {
            velocity.y -= speed;
        }
        if(scene.cursors.down.isDown) {
            velocity.y += speed;
        }

        this.setVelocity(velocity.x, velocity.y);

        if(this.getRightCenter().x >= 1000) {
            if(this.pressed.right === 0){
                this.pressed.right = 1;
                this.anims.play('right_collide');
            }
            else if(this.pressed.right === 1 && scene.cursors.right.isDown) {
                this.pressed.right = 2;
                this.anims.play('right_collide_hard');
            }
            else if(this.pressed.right === 2 && !scene.cursors.right.isDown) {
                this.pressed.right = 1;
                this.anims.play('right_collide');
            }
        }
        else if (this.getLeftCenter().x <= 0) {
            if(this.pressed.left === 0){
                this.pressed.left = 1;
                this.anims.play('left_collide');
            }
            else if(this.pressed.left === 1 && scene.cursors.left.isDown) {
                this.pressed.left = 2;
                this.anims.play('left_collide_hard');
            }
            else if(this.pressed.left === 2 && !scene.cursors.left.isDown) {
                this.pressed.left = 1;
                this.anims.play('left_collide');
            }
        }
        else if (this.pressed.right > 0 || this.pressed.left > 0) {
            this.pressed.right = 0;
            this.pressed.left = 0;
            this.anims.play('idle');
        }
    }

    return sprite;
}