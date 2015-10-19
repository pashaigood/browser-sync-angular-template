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

  if (minimatch(req.url, options.templates)) {
    // TODO: Сделать инжектор идентификатор для шаблонов.
  }

  if (angularTemplate.isMatch(req.url, options.indexJs)) {
    console.log('Time to inject');
  }
  return next();
}


angularTemplate.onFileChange = function(data) {

  // TODO: test it, when templates equal "**/*.html" - default value
  if (angularTemplate.isMatch(data.path, options.templates)) {
    data.event = 'do not ' + data.event;

    if (instance) {
      // TODO: Mock solution, change to real live action
      instance.io.sockets.emit(angularTemplate.TEMPLATE_CHANGE_EVENT, {
        selector: '#test',
        content: fs.readFileSync(data.path, 'utf8')
      });
    }
  }
};

angularTemplate.isMatch = function (path, patther) {
  return minimatch(path, patther);
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
      indexJs: 'index.js',
      templates: '**/*.html'
    }
  );

  var startWith = '**' + path.sep;

  if (options.templates.indexOf(startWith) !== 0) {
    options.templates = startWith + options.templates;
  }

  if (options.indexJs.indexOf(startWith) !== 0) {
    options.indexJs = startWith + options.indexJs;
  }

  return options;
};

module.exports = angularTemplate;
