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

        speed: 40,

        entity: null,
        direction: 0,
        destination: null,

        init: function(entity) {
            this.entity = entity;
        },

        update: function() {
            if(this.destination === null) {
                if(this.direction === 1) {
                    this.entity.vel.y = -this.speed;
                    this.destination = this.alignToGrid(this.entity.pos.x, this.entity.pos.y - this.tilesize);
                } else if(this.direction === 2) {
                    this.entity.vel.y = this.speed;
                    this.destination = this.alignToGrid(this.entity.pos.x, this.entity.pos.y + this.tilesize);
                } else if(this.direction === 3) {
                    this.entity.vel.x = -this.speed;
                    this.destination = this.alignToGrid(this.entity.pos.x - this.tilesize, this.entity.pos.y);
                } else if(this.direction === 4) {
                    this.entity.vel.x = this.speed;
                    this.destination = this.alignToGrid(this.entity.pos.x + this.tilesize, this.entity.pos.y);
                }
            } else {
                if(
                    (this.entity.pos.x <= this.destination.x && this.entity.last.x > this.destination.x) ||
                    (this.entity.pos.x >= this.destination.x && this.entity.last.x < this.destination.x) ||
                    (this.entity.pos.y <= this.destination.y && this.entity.last.y > this.destination.y) ||
                    (this.entity.pos.y >= this.destination.y && this.entity.last.y < this.destination.y)
                ) {
                    this.entity.vel = {x: 0, y: 0};
                    this.entity.pos = this.destination;
                    this.destination = null;
                    this.direction = 0;
                }

                if(this.entity.vel.x === 0 && this.entity.vel.y === 0) {
                    this.entity.pos = this.alignToGrid(this.entity.pos.x, this.entity.pos.y);
                    this.destination = null;
                    this.direction = 0;
                }
            }
        },
        
        alignToGrid: function(pos_x, pos_y) {
            return {
                x: Math.floor(pos_x / this.tilesize) * this.tilesize,
                y: Math.floor(pos_y / this.tilesize) * this.tilesize
            };
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
