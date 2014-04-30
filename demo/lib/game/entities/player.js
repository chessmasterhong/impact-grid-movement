ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity',

    // Add the grid movement plugin to the .requires for all entities that need grid movement
    'plugins.grid-movement'
)
.defines(function() {
    EntityPlayer = ig.Entity.extend({
        size: {x: 8, y: 8},

        animSheet: new ig.AnimationSheet('media/tiles.png', 8, 8),

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);

            // Initialize grid movement plugin for this entity
            this.movement = new ig.GridMovement(this);
        },

        update: function() {
            this.parent();

            // Keyboard-based grid movement
            // Check if appropriate movement key is pressed
            if(ig.input.pressed('up'))
                this.movement.direction = this.movement.moveType.UP;
            else if(ig.input.pressed('down'))
                this.movement.direction = this.movement.moveType.DOWN;
            else if(ig.input.pressed('left'))
                this.movement.direction = this.movement.moveType.LEFT;
            else if(ig.input.pressed('right'))
                this.movement.direction = this.movement.moveType.RIGHT;

            // Mouse-based grid movement
            if(ig.input.pressed('click')) {
                // The delta and tolerance are optional. It just helps to reduce the
                //   click range/angles so that the mouse click conditions do not
                //   overlap and conflict with each other.

                // Get the center of this entity and compare the center position
                //   relative to the mouse position
                var delta = {
                    x: this.pos.x + this.size.x / 2 - ig.input.mouse.x,
                    y: this.pos.y + this.size.y / 2 - ig.input.mouse.y
                };

                // Set the tolerance in pixels
                var tolerance = 16;

                // Check the mouse position relative to this entity's center position.
                //   Also check if mouse position is within tolerance range.
                if(delta.y > 0 && Math.abs(delta.x) <= tolerance)
                    this.movement.direction = this.movement.moveType.UP;
                else if(delta.y < 0 && Math.abs(delta.x) <= tolerance)
                    this.movement.direction = this.movement.moveType.DOWN;
                else if(delta.x > 0 && Math.abs(delta.y) <= tolerance)
                    this.movement.direction = this.movement.moveType.LEFT;
                else if(delta.x < 0 && Math.abs(delta.y) <= tolerance)
                    this.movement.direction = this.movement.moveType.RIGHT;
            }

            // Run grid movement plugin's update method
            this.movement.update();
        }
    });
});
