var createSession = function () {
  var currentFrame = null;
  var frames = [];
  var fakeFunc = function (name) {
    // return a function that pushs function call
    // TODO: optimize this, instead of cloning ctx just clone non-function values
    return function () {
      currentFrame.calls.push({
        name: name,
        args: _.toArray(arguments),
        ctx: _.clone(ctx) // we need to know current ctx state when calling this function
      });
    };
  };
  var ctx = {
    clearRect: fakeFunc('clearRect'),
    fillRect: fakeFunc('fillRect'),
    strokeRect: fakeFunc('strokeRect'),
    fillText: fakeFunc('fillText'),
    strokeText: fakeFunc('strokeText'),
    measureText: fakeFunc('measureText'),
    lineWidth: 1,
    lineCap: 'butt',
    lineJoin: 'miter',
    miterLimit: 10,
    getLineDash: fakeFunc('getLineDash'),
    lineDashOffset: 0,
    font: '10px sans-serif',
    textAlign: 'start',
    textBaseline: 'alphabetic',
    direction: 'inherit',
    fillStyle: '#000',
    strokeStyle: '#000',
    createLinearGradient: fakeFunc('createLinearGradient'),
    createRadialGradient: fakeFunc('createRadialGradient'),
    createPattern: '#000',
    shadowBlur: 0,
    shadowColor: 'black',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    // Paths
    beginPath: fakeFunc('beginPath'),
    closePath: fakeFunc('closePath'),
    moveTo: fakeFunc('moveTo'),
    lineTo: fakeFunc('lineTo'),
    bezierCurveTo: fakeFunc('bezierCurveTo'),
    quadraticCurveTo: fakeFunc('quadraticCurveTo'),
    arc: fakeFunc('arc'),
    arcTo: fakeFunc('arcTo'),
    ellipse: fakeFunc('ellipse'),
    rect: fakeFunc('rect'),
    // Drawing Paths
    fill: fakeFunc('fill'),
    stroke: fakeFunc('stroke'),
    drawFocusIfNeeded: fakeFunc('drawFocusIfNeeded'),
    scrollPathIntoView: fakeFunc('scrollPathIntoView'),
    clip: fakeFunc('clip'),
    isPointInPath: fakeFunc('isPointInPath'),
    isPointInStroke: fakeFunc('isPointInStroke'),
    // Transformations
    currentTransform: {},
    rotate: fakeFunc('rotate'),
    scale: fakeFunc('scale'),
    translate: fakeFunc('translate'),
    transform: fakeFunc('transform'),
    setTransform: fakeFunc('setTransform'),
    resetTransform: fakeFunc('resetTransform'),
    // Compositing
    globalAlpha: 1.0,
    globalCompositeOperation: {},
    // Drawing Images
    drawImage: fakeFunc('drawImage'),
    // PixelManipulation
    createImageData: fakeFunc('createImageData'),
    getImageData: fakeFunc('getImageData'),
    putImageData: fakeFunc('putImageData'),
    // Image Smoothing
    imageSmoothingEnabled: false,
    // Canvas State
    save: fakeFunc('save'),
    restore: fakeFunc('restore'),
    canvas: {},
    // Hit regions
    addHitRegion: fakeFunc('addHitRegion'),
    removeHitRegion: fakeFunc('removeHitRegion'),
    clearHitRegions: fakeFunc('clearHitRegions')
    // Non-standard APIs not "implemented"
  };
  var addFrame = function (cb) {
    var frame = {
      startedAt: new Date(),
      calls: []
    };

    frames.push(frame);
    currentFrame = frame;
    cb && cb(frame);
    frame.finishedAt = new Date();
  };


  return {
    frames: frames,
    addFrame: addFrame,
    ctx: ctx
  };
};
