var createSessionRunner = function (fn) {
  var session = createSession();

  var runFrame = function () {
    session.addFrame(function (frame) {
      fn(session.ctx);
    });
  };

  return {
    session: session,
    runFrame: runFrame
  };
};

var runCode = function () {
  console.log('running');
  $.get('/code.js.txt', function (code) {
    var fn = new Function('ctx', code);
    var sr = createSessionRunner(fn);

    sr.runFrame();
    console.log(sr);
  });
};

$(function () {
  $('.btn-run').click(function () {
    runCode();
  });
});
