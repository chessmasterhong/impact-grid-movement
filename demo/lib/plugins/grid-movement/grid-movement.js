/**
 *  Impact Grid Movement Plugin
 *  https://github.com/chessmasterhong/impact-grid-movement
 *
 *  Kevin Chan (chessmasterhong)
 */

ig.module(
    'plugins.grid-movement.grid-movement'
)
.requires(
    'impact.impact'
)
.defines(function() {
    "use strict";

    ig.GridMovement = ig.Class.extend({
        tilesize: 8,

        entity: null,
        direction: 0,

        init: function(entity) {
            this.entity = entity;
        },

        update: function() {
            if(this.direction === 1) {
                this.entity.pos.y -= this.tilesize;
                this.direction = 0;
            } else if(this.direction === 2) {
                this.entity.pos.y += this.tilesize;
                this.direction = 0;
            } else if(this.direction === 3) {
                this.entity.pos.x -= this.tilesize;
                this.direction = 0;
            } else if(this.direction === 4) {
                this.entity.pos.x += this.tilesize;
                this.direction = 0;
            }
        },

        /**
         *  moveType abstracts the user input direction from the grid movement
         *  logic, allowing arbitrary user key bindings.
         *  +---+---+---+
         *  |   | 1 |   |
         *  +---+---+---+
         *  | 3 | 0 | 4 |
         *  +---+---+---+
         *  |   | 2 |   |
         *  +---+---+---+
         */
        moveType: {
            'UP': 1,
            'DOWN': 2,
            'LEFT': 3,
            'RIGHT': 4
        }
    });
});
