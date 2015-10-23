angularTemplate.TEMPLATE_CHANGE_EVENT = 'template:change';

var instance,
  logger = console.log,
  _ = require('lodash'),
  minimatch = require('minimatch'),
  path = require('path'),
  fs = require('fs'),
  tamper = require('tamper'),
  fileChanger = require('./fileChanger'),
  options,
  ag = angularTemplate;


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
  return tamper(middleware);
}


function middleware(req, res) {

  if (ag.isMatch(req.url, options.templates)) {
    logger('Time to mark injector.');
    return function(body) {
      return fileChanger.markInjector(body);
    }
  }
  else
  if (ag.isMatch(req.url, options.indexJs)) {
    logger('Time to run injector.');
    return function(body) {
      return fileChanger.runInjector(body, options.moduleName);
    };
  }
}


ag.onFileChange = function(data) {

  // TODO: test it, when templates equal "**/*.html" - default value
  if (ag.isMatch(data.path, options.templates)) {
    data.event = 'do not ' + data.event;

    if (instance) {
      // TODO: Mock solution, change to real live action
      instance.io.sockets.emit(ag.TEMPLATE_CHANGE_EVENT, {
        selector: '#test',
        content: fs.readFileSync(data.path, 'utf8')
      });
    }
  }
};

ag.isMatch = function (path, patther) {
  return minimatch(path, patther);
};

ag.setLogger = function (newLogger) {
  logger = newLogger || console.log;
};

ag.setInstance = function (newInstance) {
  instance = newInstance || {};
};

ag.setOption = function (newOptions) {
  // TODO: Auto get module name from bower or package.
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

module.exports = ag;
