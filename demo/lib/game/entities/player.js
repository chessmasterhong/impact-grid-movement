/**
 *  player.js
 *  -----
 */


ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function() {
    EntityPlayer = ig.Entity.extend({
        size: {x: 8, y: 8},

        animSheet: new ig.AnimationSheet('media/tiles.png', 8, 8),

        init: function(x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 1, [0]);
        },

        update: function() {
            this.parent();

            // Get direction from user input
            this.gridMovementBindKeys('up', 'down', 'left', 'right');
            this.gridMovementBindMouse('click');
        }
    });
});
