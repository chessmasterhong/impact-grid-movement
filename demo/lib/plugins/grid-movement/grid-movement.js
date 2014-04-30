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
            if(ig.input.pressed('up')) {
                this.entity.pos.y -= this.tilesize;
            } else if(ig.input.pressed('down')) {
                this.entity.pos.y += this.tilesize;
            } else if(ig.input.pressed('left')) {
                this.entity.pos.x -= this.tilesize;
            } else if(ig.input.pressed('right')) {
                this.entity.pos.x += this.tilesize;
            }
        }
    });
});
