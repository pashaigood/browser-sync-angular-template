angularTemplate.TEMPLATE_CHANGE_EVENT = 'template:change';

var instance,
  logger,
  _ = require('lodash'),
  minimatch = require('minimatch'),
  path = require('path'),
  fs = require('fs'),
  options;


function angularTemplate(opts, _instance_) {
  switch (arguments.length) {
    case 1:
      break;
    case 2:
      instance = _instance_;
      //instance.emitter.on('file:changed', angularTemplate.onFileChange);

      var eventName = 'file:changed';
      var oldListeners = instance.emitter.listeners(eventName);
      instance.emitter.removeAllListeners(eventName);
      instance.emitter.on(eventName, angularTemplate.onFileChange);
      _.each(
        oldListeners, function (listener) {
          instance.emitter.on(eventName, listener);
        }
      );
      break;
  }
  // I can make some magic here!
  return middleware;
}


function middleware(req, res, next) {

  if (minimatch(req.url, options.files)) {
    // TODO: Сделать инжектор идентификатор для шаблонов.
  }
  return next();
}


angularTemplate.onFileChange = function(data) {
  console.log(data);
  // TODO: test it, when files equal "**/*.html" - default value
  if (minimatch(data.path, '**' + path.sep + options.files)) {
    data.event = 'do not ' + data.event;
    instance.io.sockets.emit(angularTemplate.TEMPLATE_CHANGE_EVENT, {
      selector: '#test',
      content: fs.readFileSync(data.path, 'utf8')
    });

    //data.type = 'inject';
    //data.ext = 'css';
    //delete  data.url;
  }
};

angularTemplate.isMatched = function(request) {
  return;
};

angularTemplate.setLogger = function (newLogger) {
  logger = newLogger || function () {};
};

angularTemplate.setInstance = function (newInstance) {
  instance = newInstance || {};
};

angularTemplate.setOption = function (newOptions) {
  options = _.defaults(
    newOptions || {},
    {
      files: '**/*.html'
    }
  );
};

module.exports = angularTemplate;
