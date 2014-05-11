/**
 *  grid-movement-debug.js
 *  -----
 *  Impact Grid Movement Plugin - Debug Menu
 *  https://github.com/chessmasterhong/impact-grid-movement
 *
 *  Kevin Chan (chessmasterhong)
 *
 *  Optional debug menu extension for the grid movement plugin.
 */


ig.module(
    'plugins.grid-movement-debug'
)
.requires(
    'impact.debug.menu',
    'impact.entity',
    'plugins.grid-movement'
)
.defines(function() {
    "use strict";

    ig.Entity.inject({
        draw: function() {
            this.parent();

            if(ig.Entity._debugShowGrid && typeof this.gridMovement.mapsize !== 'undefined') {
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
        }
    });

    ig.Entity._debugShowGrid = false;

    ig.debug.addPanel({
        type: ig.DebugPanel,
        name: 'grid-movement-debug',
        label: 'Grid',

        options: [{
            name: 'Show grid',
            object: ig.Entity,
            property: '_debugShowGrid'
        }]
    });
});
