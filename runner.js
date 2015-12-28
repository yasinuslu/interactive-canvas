var inherits = function (child, parent) {
  child.prototype = new parent();
  child.prototype.constructor = parent;
};

var FPS = 5;

var createSessionRunner = function (code) {
  var session = createSession(FakeDate);
  var module = resolveModule(code);
  var currentTS;
  var isRunning = false;

  function FakeDate(/* arguments */) {
    var args = _.toArray(arguments);
    if(!args.length) {
      args[0] = currentTS;
    }
    XDate.apply(this, args);
  };
  FakeDate.prototype = new XDate();
  FakeDate.prototype.constructor = FakeDate;
  FakeDate.now = function () {
    return currentTS;
  };

  function record(ms, cb) {
    var startTS = new Date().getTime();
    var endTS = startTS + ms;
    currentTS = startTS;
    var tsForFrame = 1000 / FPS;
    isRunning = true;

    var run = function () {
      if(currentTS > endTS) {
        isRunning = false;
        cb && cb();
        return;
      }
      runFrame();
      currentTS += tsForFrame;
      _.defer(run);
      // run();
    };

    run();
  };

  function resolveModule(code) {
    // encapsulate this
    var moduleFunction = new Function('exports', 'Date', code);
    var module = {};
    moduleFunction(module, FakeDate);
    return module;
  };

  function runFrame() {
    session.addFrame(function (frame) {
      module.draw(session.ctx);
      console.log('val:', module.__debug("myScopedVar"));
    });
  };

  return {
    isRunning: isRunning,
    session: session,
    runFrame: runFrame,
    record: record
  };
};

var runCode = function () {
  console.log('running');
  $.get('/code.js.txt', function (code) {
    var sr = createSessionRunner(code);
    sr.record(10000);
  });
};

$(function () {
  $('.btn-run').click(function () {
    runCode();
  });
});
