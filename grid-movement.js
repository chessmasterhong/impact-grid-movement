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
 */


ig.module(
    'plugins.grid-movement'
)
.requires(
    'impact.entity'
)
.defines(function() {
    "use strict";

    ig.Entity.inject({
        // Seperate grid movement plugin properties from the rest of the entity
        //   (to prevent properties from accidentally being overwritten)
        gridMovement: {
            debug: {
                // Set true to enable console logs from grid-movement. Default: false.
                enable: false,

                // Set true to display map tile grids. Default: false.
                showGrid: false
            },

            // # < 0 : collisionMap
            // # = 0 : backgroundMap[0] (default)
            // # = 1 : backgroundMap[1]
            // # = 2 : backgroundMap[2]
            // ...
            mapType: 0,

            tilesize: 8,
            speed: 100,

            // direction:
            //   X = null (default)
            //   0 = up,
            //   1 = down,
            //   2 = left
            //   3 = right
            // +---+---+---+
            // |   | 0 |   |
            // +---+---+---+
            // | 2 | X | 3 |
            // +---+---+---+
            // |   | 1 |   |
            // +---+---+---+
            direction: null,

            destination: null,
        },

        update: function() {
            this.parent();

            // If mapsize is not defined, get mapsize
            // This is to prevent the if-statement from constantly running and
            //   updating mapsize, even after it has been set already
            if(typeof this.gridMovement.mapsize === 'undefined') {
                // If config is set to use collision map and the map has a
                //   collision map, use collision map to define mapsize
                if(
                    this.gridMovement.mapType < 0 &&
                    typeof ig.game.collisionMap.width !== 'undefined' &&
                    typeof ig.game.collisionMap.height !== 'undefined'
                ) {
                    this.gridMovement.mapsize = {
                        x: ig.game.collisionMap.width * this.gridMovement.tilesize,
                        y: ig.game.collisionMap.height * this.gridMovement.tilesize
                    };

                    if(this.gridMovement.debug.enable) {
                        console.log('collisionMap found. Setting mapsize using collision map.');
                        console.log('mapsize: { x: ' + this.gridMovement.mapsize.x + ', y: ' + this.gridMovement.mapsize.y + ' }');
                    }
                // Otherwise, if config is set to use background map and the
                //   map has a background map of index mapType, use background
                //   map of index mapType to define mapsize
                } else if(
                    this.gridMovement.mapType >= 0 &&
                    typeof ig.game.backgroundMaps !== 'undefined'
                ) {
                    this.gridMovement.mapsize = {
                        x: ig.game.backgroundMaps[this.gridMovement.mapType].width * this.gridMovement.tilesize,
                        y: ig.game.backgroundMaps[this.gridMovement.mapType].height * this.gridMovement.tilesize
                    };

                    if(this.gridMovement.debug.enable) {
                        console.log('backgroundMap[' + this.gridMovement.mapType + '] found. Setting mapsize using background map ' + this.gridMovement.mapType + '.');
                        console.log('mapsize: { x: ' + this.gridMovement.mapsize.x + ', y: ' + this.gridMovement.mapsize.y + ' }');
                    }
                // Fallback: No collision map or background map of index
                //   mapType was found. Set dummy mapsize to prevent
                //   if-statement from constantly running and updating mapsize
                //   and send a warning to console.
                } else {
                    this.gridMovement.mapsize = {x: 0, y: 0};
                    console.warn('WARNING: grid-movement cannot detect a valid collision map or background map for this level.');
                }
            }

            // Destination not determined yet
            if(this.gridMovement.destination === null) {
                if(this.gridMovement.direction === 0) {
                    // Start moving entity in specified direction
                    this.vel.y = -this.gridMovement.speed;

                    // Set appropriate destination
                    this.gridMovement.destination = this.alignToGrid(this.pos.x, this.pos.y - this.gridMovement.tilesize);
                } else if(this.gridMovement.direction === 1) {
                    // Start moving entity in specified direction
                    this.vel.y = this.gridMovement.speed;

                    // Set appropriate destination
                    this.gridMovement.destination = this.alignToGrid(this.pos.x, this.pos.y + this.gridMovement.tilesize);
                } else if(this.gridMovement.direction === 2) {
                    // Start moving entity in specified direction
                    this.vel.x = -this.gridMovement.speed;

                    // Set appropriate destination
                    this.gridMovement.destination = this.alignToGrid(this.pos.x - this.gridMovement.tilesize, this.pos.y);
                } else if(this.gridMovement.direction === 3) {
                    // Start moving entity in specified direction
                    this.vel.x = this.gridMovement.speed;

                    // Set appropriate destination
                    this.gridMovement.destination = this.alignToGrid(this.pos.x + this.gridMovement.tilesize, this.pos.y);
                }

                // Reset direction back to default
                this.gridMovement.direction = null;
            // Destination set
            } else {
                // Stop entity when colliding with collision tiles
                // Prevent entity from running off map edge
                if(
                    (this.vel.x === 0 && this.vel.y === 0) ||
                    (this.pos.x < 0 || this.pos.x > this.gridMovement.mapsize.x - this.gridMovement.tilesize ||
                     this.pos.y < 0 || this.pos.y > this.gridMovement.mapsize.y - this.gridMovement.tilesize)
                ) {
                    // Stop entity's movement
                    this.vel = {x: 0, y: 0};

                    // Align entity's position to destination
                    this.pos = this.alignToGrid(this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);

                    // Reset destination (wait for next user input)
                    this.gridMovement.destination = null;

                // Wait until entity has reached or moved past destination tile
                } else if(
                    (this.pos.x <= this.gridMovement.destination.x && this.last.x > this.gridMovement.destination.x) ||
                    (this.pos.x >= this.gridMovement.destination.x && this.last.x < this.gridMovement.destination.x) ||
                    (this.pos.y <= this.gridMovement.destination.y && this.last.y > this.gridMovement.destination.y) ||
                    (this.pos.y >= this.gridMovement.destination.y && this.last.y < this.gridMovement.destination.y)
                ) {
                    // Stop entity's movement
                    this.vel = {x: 0, y: 0};

                    // Align entity's position to destination
                    this.pos = this.gridMovement.destination;

                    // Reset destination (wait for next user input)
                    this.gridMovement.destination = null;
                }
            }
        },

        draw: function() {
            this.parent();

            if(this.gridMovement.debug.showGrid && typeof this.gridMovement.mapsize !== 'undefined') {
                ig.system.context.strokeStyle = 'rgba(0, 0, 0, 0.2)';
                ig.system.context.lineWidth = 1;

                // Draw vertical lines spanning map width
                for(var x = 0; x <= this.gridMovement.mapsize.x; x += this.gridMovement.tilesize) {
                    ig.system.context.beginPath();
                        // From horizontal top
                        ig.system.context.moveTo(
                            ig.system.getDrawPos(x + 0.5),
                            ig.system.getDrawPos(0)
                        );

                        // To horizontal bottom
                        ig.system.context.lineTo(
                            ig.system.getDrawPos(x + 0.5),
                            ig.system.getDrawPos(this.gridMovement.mapsize.y)
                        );

                        ig.system.context.stroke();
                    ig.system.context.closePath();
                }

                // Draw horizontal lines spanning map height
                for(var y = 0; y <= this.gridMovement.mapsize.y; y += this.gridMovement.tilesize) {
                    ig.system.context.beginPath();
                        // From vertical top
                        ig.system.context.moveTo(
                            ig.system.getDrawPos(0),
                            ig.system.getDrawPos(y + 0.5)
                        );

                        // To vertical bottom
                        ig.system.context.lineTo(
                            ig.system.getDrawPos(this.gridMovement.mapsize.x + 0.5),
                            ig.system.getDrawPos(y + 0.5)
                        );

                        ig.system.context.stroke();
                    ig.system.context.closePath();
                }
            }
        },

        /**
         *  gridMovementBindKeys(keyUp, keyDown, keyLeft, keyRight)
         *    Enables keyboard-based entity movement. Abstracts user input
         *    direction from grid movement logic, allowing arbitrary user key
         *    bindings.
         */
        gridMovementBindKeys: function(keyUp, keyDown, keyLeft, keyRight) {
            // Destination not determined yet
            if(this.gridMovement.destination === null) {
                this.gridMovement.direction =
                    ig.input.state(keyUp)    ? 0 :
                    ig.input.state(keyDown)  ? 1 :
                    ig.input.state(keyLeft)  ? 2 :
                    ig.input.state(keyRight) ? 3 :
                    null;
            }
        },

        /**
         *  gridMovementBindMouse(key, tolerance)
         *    Enables mouse-based entity movement. Abstracts user input
         *    direction from grid movement logic, allowing arbitrary user key
         *    bindings.
         */
        gridMovementBindMouse: function(key, tolerance) {
            // Destination not determined yet
            if(this.gridMovement.destination === null) {
                if(ig.input.state(key)) {
                    // The delta and tolerance are optional. It just helps to reduce the
                    //   click range/angles so that the mouse click conditions do not
                    //   overlap and conflict with each other.

                    // Get the center of this entity and compare the center position
                    //   relative to the mouse position
                    var delta = {
                        x: this.pos.x + this.size.x / 2 - ig.input.mouse.x,
                        y: this.pos.y + this.size.y / 2 - ig.input.mouse.y
                    };

                    // Set the tolerance in pixels; defaults to tilesize if not explicitly set
                    tolerance = typeof tolerance !== 'undefined' ? tolerance : this.gridMovement.tilesize / 2;

                    // Check the mouse position relative to this entity's center position.
                    //   Also check if mouse position is within tolerance range.
                    this.gridMovement.direction =
                        delta.x < 0 && Math.abs(delta.y) <= tolerance ? 3 :
                        delta.y > 0 && Math.abs(delta.x) <= tolerance ? 0 :
                        delta.y < 0 && Math.abs(delta.x) <= tolerance ? 1 :
                        delta.x > 0 && Math.abs(delta.y) <= tolerance ? 2 :
                        null;
                }
            }
        },

        /**
         *  alignToGrid(pos_x, pos_y)
         *    Aligns the provided coordinates to the nearest grid tile. Used to
         *    reposition entities back to grid in case they get knocked off of
         *    grid alignment.
         */
        alignToGrid: function(pos_x, pos_y) {
            return {
                x: Math.floor(pos_x / this.gridMovement.tilesize) * this.gridMovement.tilesize,
                y: Math.floor(pos_y / this.gridMovement.tilesize) * this.gridMovement.tilesize
            };
        }
    });
});
