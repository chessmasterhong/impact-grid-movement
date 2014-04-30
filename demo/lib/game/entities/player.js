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
                var delta = {
                    x: this.pos.x + this.size.x / 2 - ig.input.mouse.x,
                    y: this.pos.y + this.size.y / 2 - ig.input.mouse.y
                };
                var tolerance = 16;

                if(delta.y > 0 && Math.abs(delta.x) <= tolerance)
                    this.movement.direction = this.movement.moveType.UP;
                else if(delta.y < 0 && Math.abs(delta.x) <= tolerance)
                    this.movement.direction = this.movement.moveType.DOWN;
                else if(delta.x > 0 && Math.abs(delta.y) <= tolerance)
                    this.movement.direction = this.movement.moveType.LEFT;
                else if(delta.x < 0 && Math.abs(delta.y) <= tolerance)
                    this.movement.direction = this.movement.moveType.RIGHT;
            }

            this.movement.update();
        }
    });
});
