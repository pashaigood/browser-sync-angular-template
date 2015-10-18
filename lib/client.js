(function (bs) {
  console.log(1);
  var EVENT_NAME = "template:change";

  var sockets = bs.socket;


  sockets.on(EVENT_NAME, function (data) {
    console.log('client: hi');
  });
})(window.___browserSync___);
