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

            this.movement.update();
        }
    });
});
