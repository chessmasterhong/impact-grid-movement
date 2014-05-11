/**
 *  main.js
 *  -----
 */


ig.module(
    'game.main'
)
.requires(
    'impact.game',
    'impact.debug.debug', // Impact debug menu (You must have this to add grid movement debug menu)
    'game.levels.demo',
    'game.entities.player',
    'plugins.grid-movement', // Grid movement plugin
    'plugins.grid-movement-debug' // Grid movement debug menu
)
.defines(function() {
    var MainGame = ig.Game.extend({
        init: function() {
            // Bind keyboard keys for grid movement
            ig.input.bind(ig.KEY.UP_ARROW, 'up');
            ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
            ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');

            // Bind mouse button for grid movement
            ig.input.bind(ig.KEY.MOUSE1, 'click');

            this.loadLevel(LevelDemo);
        }
    });

    ig.main('#canvas', MainGame, 60, 240, 160, 2);
});
