Impact Grid Movement Plugin
===
A plugin for the Impact game engine that enables grid movement for entities. Supports arbitrary keyboard-based and mouse-based user inputs.


Usage
---
1. Download `grid-movement.js` into your project's plugin directory (for example: `lib/plugins/grid-movement.js`).
2. Add the line `plugins.grid-movement` in the `.requires` section for the entity that you want to apply grid movement to.
3. To initialize grid movement, in your entity's `init` method, add the following line:

    ```
    this.movement = new ig.GridMovement(this);
    ```

4. For the entity to respond to the user's input:

    a. For mouse support, in your entity's `update` method, add the following lines:

        if(this.movement.destination === null) {
            if(ig.input.pressed('up'))
                this.movement.direction = this.movement.moveType.UP;
            else if(ig.input.pressed('down'))
                this.movement.direction = this.movement.moveType.DOWN;
            else if(ig.input.pressed('left'))
                this.movement.direction = this.movement.moveType.LEFT;
            else if(ig.input.pressed('right'))
                this.movement.direction = this.movement.moveType.RIGHT;
        }

    ** *Be sure to bind the keyboard keys in your main game.*

    b. For mouse support, in your entity's `update` method, add the following lines:

        if(this.movement.destination === null) {
            if(ig.input.pressed('click')) {
                if(this.pos.y < ig.input.mouse.y)
                    this.movement.direction = this.movement.moveType.UP;
                else if(this.pos.y > ig.input.mouse.y)
                    this.movement.direction = this.movement.moveType.DOWN;
                else if(this.pos.x < ig.input.mouse.x)
                    this.movement.direction = this.movement.moveType.LEFT;
                else if(this.pos.x > ig.input.mouse.x)
                    this.movement.direction = this.movement.moveType.RIGHT;
            }
        }

    ** *Be sure to bind the mouse button(s) in your main game.*

5. Lastly, in your entity's `update` method (after the code above), add the following line:

    ```
    this.movement.update();
    ```

6. Repeat steps 2 to 5 for each entity you want to apply grid movement to.

This sets up your game for basic grid movement. There are improved implementations for this; see the demo's source code for more information.
