# Interactive Editor for canvas

This is the starting point of a project inspired by this talk https://www.youtube.com/watch?v=EGqwXt90ZqA

## What's done
- This is a prototype that doesn't currently work
- currently we have a `createSession` function that creates a drawing session with a fake canvas context.
- You write some canvas drawing code in code.js.txt and press run you'll have your frame recorded to play in a real canvas
- Currently we record 1 frame
- We could give user a real context and use drawImage on every frame and record that. But we want more inside info like which line of code draws what.

## TODO
- fake Date when running user script and record given ms of canvas
- experiment, refactor, experiment, refactor...
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

We can observe user's custom code scope with this hack:
```js
exports.___debug = function (code) {
  return new Function(code)();
};
```
We can add this function to any function's string and dive into that scope.

## about hot swap
So far i could access and manipulate any variable i want from outside that scope using eval.
So in theory if we parse and get a list of all variables in a scope we should be able to save their values
and hot swap code and reassign those variables. This could work with 1 level of function but i think we
can do anything if we analyze user's code and inject debug function's in appropriate places we can manipulate inner scopes too.
