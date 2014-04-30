/**
 *  grid-movement.js
 *  -----
 *  Impact Grid Movement Plugin
 *  https://github.com/chessmasterhong/impact-grid-movement
 *
 *  Kevin Chan (chessmasterhong)
 *
 *  A plugin for the ImpactJS game engine that enables grid movement for
 *  entities. Supports arbitrary keyboard-based and mouse-based user inputs.
 */


ig.module(
    'plugins.grid-movement'
)
.requires(
    'impact.impact'
)
.defines(function() {
    "use strict";

    ig.GridMovement = ig.Class.extend({
        // The grid or tile size the entity should align itself on to
        tilesize: 8,

        // The speed in which the entity should move at (to another tile)
        speed: 40,

        entity: null,
        direction: null,
        destination: null,

        init: function(entity) {
            // Set this.entity with the entity to apply grid movement to
            this.entity = entity;
        },

        update: function() {
            // If a destination has not been determined yet
            if(this.destination === null) {
                // Get the direction from the user input. Set the appropriate
                //   destination and start moving the entity in the specified direction
                /*
                 *        -vel.y
                 *           |
                 * -vel.x -- X -- +vel.x
                 *           |
                 *        +vel.y
                 */
                if(this.direction === 0) {
                    this.entity.vel.y = -this.speed;
                    this.destination = this.alignToGrid(this.entity.pos.x, this.entity.pos.y - this.tilesize);
                } else if(this.direction === 1) {
                    this.entity.vel.y = this.speed;
                    this.destination = this.alignToGrid(this.entity.pos.x, this.entity.pos.y + this.tilesize);
                } else if(this.direction === 2) {
                    this.entity.vel.x = -this.speed;
                    this.destination = this.alignToGrid(this.entity.pos.x - this.tilesize, this.entity.pos.y);
                } else if(this.direction === 3) {
                    this.entity.vel.x = this.speed;
                    this.destination = this.alignToGrid(this.entity.pos.x + this.tilesize, this.entity.pos.y);
                }

                // Once we have our destination, reset the direction back to default
                this.direction = null;

            // A destination has been set
            } else {
                // Wait until the entity has reached or exceeded the destination tile
                if(
                    (this.entity.pos.x <= this.destination.x && this.entity.last.x > this.destination.x) ||
                    (this.entity.pos.x >= this.destination.x && this.entity.last.x < this.destination.x) ||
                    (this.entity.pos.y <= this.destination.y && this.entity.last.y > this.destination.y) ||
                    (this.entity.pos.y >= this.destination.y && this.entity.last.y < this.destination.y)
                ) {
                    // Stop the entity's movement
                    this.entity.vel = {x: 0, y: 0};

                    // Align the entity's position to the destination
                    this.entity.pos = this.destination;

                    // Reset the destination (wait for next user input)
                    this.destination = null;
                }

                // Fix for condition when entity collides with collision tiles
                // By default, after entity collides, entity stops moving
                if(this.entity.vel.x === 0 && this.entity.vel.y === 0) {
                    // Realign the entity's position back to the grid (in case it has been knocked off grid alignment)
                    this.entity.pos = this.alignToGrid(this.entity.pos.x, this.entity.pos.y);

                    // Reset the destination (wait for next user input)
                    this.destination = null;
                }
            }
        },

        /**
         *  object alignToGrid(number pos_x, number pos_y)
         *  -----
         *  Aligns the provided coordinates to the nearest grid tile. Used to reposition
         *  entities back to grid in case they get knocked off of grid alignment.
         *
         *  Precondition:
         *      pos_x: The current x-coordinate of the entity.
         *      pos_y: The current y-coordinate of the entity.
         *
         *  Postcondition:
         *      Returns an object of 2 properties {x: pos_x_aligned, y: pos_y_aligned},
         *      such that pos_x_aligned and pos_y_aligned represents the aligned
         *      coordinates, respectively. If the entity or object uses the coordinates
         *      provided in the return value, it should align itself to the map rounded
         *      to the nearest multiple of this.tilesize.
         *
         *  Example:
         *      this.tilesize = 32;
         *      this.pos = {x: 36.59, y: 74.02}
         *      this.pos = this.alignToGrid(this.pos.x, this.pos.y);
         *      console.log(this.pos); // {x: 32, y: 72}
         */
        alignToGrid: function(pos_x, pos_y) {
            return {
                x: Math.floor(pos_x / this.tilesize) * this.tilesize,
                y: Math.floor(pos_y / this.tilesize) * this.tilesize
            };
        },

        /**
         *  moveType
         *  -----
         *  Abstracts the user input direction from the grid movement
         *  logic, allowing arbitrary user key bindings.
         *
         *  +---+---+---+
         *  |   | 0 |   |
         *  +---+---+---+
         *  | 2 | X | 3 |
         *  +---+---+---+
         *  |   | 1 |   |
         *  +---+---+---+
         */
        moveType: {
            'UP': 0,
            'DOWN': 1,
            'LEFT': 2,
            'RIGHT': 3
        }
    });
});
