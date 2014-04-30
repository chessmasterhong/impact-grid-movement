Impact Grid Movement Plugin
===
A plugin for the ImpactJS game engine that enables grid movement for entities. Supports arbitrary keyboard-based and mouse-based user inputs.


Usage
---
1. Download `grid-movement.js`.
2. Put `grid-movement.js` into your project's plugin directory (for example: `lib/plugins/grid-movement.js`).
3. Add the line `plugins.grid-movement` in your entity's `.requires` section for the entity that you want to apply grid movement to.
4. In your entity's `init` method, add the following line:

```
this.movement = new ig.GridMovement(this);
```

5a. For mouse support, in your entity's `update` method, add the following lines:

```
if(ig.input.pressed('up'))
    this.movement.direction = this.movement.moveType.UP;
else if(ig.input.pressed('down'))
    this.movement.direction = this.movement.moveType.DOWN;
else if(ig.input.pressed('left'))
    this.movement.direction = this.movement.moveType.LEFT;
else if(ig.input.pressed('right'))
    this.movement.direction = this.movement.moveType.RIGHT;
```

*Be sure to bind the keyboard keys in your main game.*

5b. For mouse support, in your entity's `update` method, add the following lines:

```
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
```

*Be sure to bind the mouse button(s) in your main game.*


This sets up your game for basic grid movement. There are improved implementations for this; see the demo's source code for more information.
