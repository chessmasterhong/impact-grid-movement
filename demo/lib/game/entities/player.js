ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity',
    'plugins.grid-movement.grid-movement'
)
.defines(function() {
    EntityPlayer = ig.Entity.extend({
        size: {x: 8, y: 8},
        maxVel: {x: 256, y: 256},

        animSheet: new ig.AnimationSheet('media/tiles.png', 8, 8),

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);

            this.movement = new ig.GridMovement(this);
        },

        update: function() {
            this.parent();

            if(ig.input.pressed('up'))
                this.movement.direction = this.movement.moveType.UP;
            if(ig.input.pressed('down'))
                this.movement.direction = this.movement.moveType.DOWN;
            if(ig.input.pressed('left'))
                this.movement.direction = this.movement.moveType.LEFT;
            if(ig.input.pressed('right'))
                this.movement.direction = this.movement.moveType.RIGHT;

            if(ig.input.pressed('click')) {
                if(ig.input.mouse.x < this.pos.x)
                    this.movement.direction = this.movement.moveType.UP;
                if(ig.input.mouse.x > this.pos.x)
                    this.movement.direction = this.movement.moveType.DOWN;
                if(ig.input.mouse.y < this.pos.y)
                    this.movement.direction = this.movement.moveType.LEFT;
                if(ig.input.mouse.y > this.pos.y)
                    this.movement.direction = this.movement.moveType.RIGHT;
            }

            this.movement.update();
        }
    });
});
