Impact Grid Movement Plugin
===
A plugin for the Impact game engine that enables grid movement for entities.


Features
---
* Arbitrary user-defined keyboard inputs
* Support for mouse-based user input
* Continuous movement
* Post-collision realignment
* Map edge auto-detection
* Togglable grid display mode (via optional debug menu)


Basic Usage
---
1. Download `grid-movement.js` into your project's plugin directory (for example: `lib/plugins/grid-movement.js`).
2. To initialize grid movement, add the line `plugins.grid-movement` in the `.requires` section of your main game (for example: `lib/game/main.js`).
3. For the entity to respond to the user's input, do either or both of the following (depending on your game):

  a. For keyboard support, add `this.gridMovementBindKeys('up', 'down', 'left', 'right');` in your entity's `update` method.

    * The `'up'`, `'down'`, `'left'`, and `'right'` arguments can be changed to fit your game.

    * Be sure to bind the keyboard keys in your main game.

  b. For mouse support add `this.gridMovementBindMouse('click');` in your entity's `update` method.

    * The `'click'` argument can be changed to fit your game.

    * An optional argument (click distance tolerance) can be added to gridMovementBindMouse. Defaults to tile size if not specified.

    * Be sure to bind the mouse button in your main game.

4. Repeat step 3 for each entity you want to apply grid movement to.
5. This sets up your game for basic grid movement. Enjoy!

For an example or more information, see the included demo's source code.


Debug
---
To enable debug, download `grid-movement-debug.js` into your project's plugin directory (for example: `lib/plugins/grid-movement.js`) and add the line `plugins.grid-movement-debug` in the `.requires` section of your main game (for example: `lib/game/main.js`). 

Be sure you have `'impact.debug.menu'` in your main game's `.requires` section as well.

That's it! Now run your game. You will see an extra option called `Grid` in your debug menu. Click on it. Currently there is only one option (`Show grid`, which will display the map's grid based on the grid movement plugin's map size).

* The grid movement debug menu is *optional*. It is not required to enable grid movement.


Configuration
---
TODO
