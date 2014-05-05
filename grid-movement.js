/**
 *  grid-movement.js
 *  -----
 *  Impact Grid Movement Plugin
 *  https://github.com/chessmasterhong/impact-grid-movement
 *
 *  Kevin Chan (chessmasterhong)
 *
 *  A plugin for the ImpactJS game engine that enables grid-based movement for
 *  entities.
 *
 *  Features:
 *      - Arbitrary user-defined keyboard inputs
 *      - Support for mouse-based user input
 *      - Continuous movement
 *      - Map edge auto-detection
 */


ig.module(
    'plugins.grid-movement.grid-movement'
)
.requires(
    'impact.entity',
    'impact.map'
)
.defines(function() {
    "use strict";

    ig.Entity.inject({
        speed: 100,

        direction: null,
        destination: null,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            this.tilesize = ig.tilesize;
            this.mapsize = {
                x: ig.game.collisionMap.width * this.tilesize,
                y: ig.game.collisionMap.height * this.tilesize
            };
        },

        update: function() {
            this.parent();

            // Destination not determined yet
            if(this.destination === null) {
                // Get direction from user input
                if(ig.input.state('up'))
                    this.direction = this.moveDir.UP;
                else if(ig.input.state('down'))
                    this.direction = this.moveDir.DOWN;
                else if(ig.input.state('left'))
                    this.direction = this.moveDir.LEFT;
                else if(ig.input.state('right'))
                    this.direction = this.moveDir.RIGHT;

                if(this.direction === 0) {
                    // Start moving entity in specified direction
                    this.vel.y = -this.speed;

                    // Set appropriate destination
                    this.destination = this.alignToGrid(this.pos.x, this.pos.y - this.tilesize);
                } else if(this.direction === 1) {
                    // Start moving entity in specified direction
                    this.vel.y = this.speed;

                    // Set appropriate destination
                    this.destination = this.alignToGrid(this.pos.x, this.pos.y + this.tilesize);
                } else if(this.direction === 2) {
                    // Start moving entity in specified direction
                    this.vel.x = -this.speed;

                    // Set appropriate destination
                    this.destination = this.alignToGrid(this.pos.x - this.tilesize, this.pos.y);
                } else if(this.direction === 3) {
                    // Start moving entity in specified direction
                    this.vel.x = this.speed;

                    // Set appropriate destination
                    this.destination = this.alignToGrid(this.pos.x + this.tilesize, this.pos.y);
                }

                // Reset direction back to default
                this.direction = null;

            // Destination set
            } else {
                // Stop entity when colliding with collision tiles
                // Prevent entity from running off map edge
                if(
                    (this.vel.x === 0 && this.vel.y === 0) ||
                    (this.pos.x < 0 || this.pos.x > this.mapsize.x ||
                     this.pos.y < 0 || this.pos.y > this.mapsize.y)
                ) {
                    // Stop entity's movement
                    this.vel = {x: 0, y: 0};

                    // Align entity's position to destination
                    this.pos = this.alignToGrid(this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);

                    // Reset destination (wait for next user input)
                    this.destination = null;

                // Wait until entity has reached or moved past destination tile
                } else if(
                    (this.pos.x <= this.destination.x && this.last.x > this.destination.x) ||
                    (this.pos.x >= this.destination.x && this.last.x < this.destination.x) ||
                    (this.pos.y <= this.destination.y && this.last.y > this.destination.y) ||
                    (this.pos.y >= this.destination.y && this.last.y < this.destination.y)
                ) {
                    // Stop entity's movement
                    this.vel = {x: 0, y: 0};

                    // Align entity's position to destination
                    this.pos = this.destination;

                    // Reset destination (wait for next user input)
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
         *  moveDir
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
        moveDir: {
            'UP'   : 0,
            'DOWN' : 1,
            'LEFT' : 2,
            'RIGHT': 3
        }
    });
});
