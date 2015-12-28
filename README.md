# Interactive Editor for canvas

This is the starting point of a project inspired by this talk https://www.youtube.com/watch?v=EGqwXt90ZqA

## What's done
- This is a prototype that doesn't currently work
- currently we have a `createSession` function that creates a drawing session with a fake canvas context.
- You write some canvas drawing code in code.js.txt and press run you'll have your frame recorded to play in a real canvas
- Currently we record 1 frame

## TODO
- record 60 * 5 (5 seconds of a canvas) frames and play it in a canvas
- add items to this todo :D

## Some notes

We have ctx state on all function calls so we can alter canvas ctx while executing those calls on real canvas. An example code would look like this:
```js
var drawFrame = function (frame, realContext) {
  _.each(frame.calls, function (call) {
    // currently call.ctx has methods but we'll change that to only store non-function fields

    // set ctx state to the exact state when that method called
    _.extend(realContext, call.ctx);

    // call given method on realContext with given arguments
    realContext[call.name].apply(realContext, call.args);
  });
};
```
