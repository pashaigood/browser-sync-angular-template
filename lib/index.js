//var historyApiFallback = require("connect-history-api-fallback");
//var merger = require("opt-merger");

const PLUGIN_NAME          = "BrowserSync Angular Template";
const TEMPLATE_CHANGE_EVENT = "template:change";
const CLIENT_JS            = "/client.js";


/**
 * Plugin interface for BrowserSync
 */
var plugin = {
  "plugin:name": PLUGIN_NAME,
  "plugin": function (opts, _instance_) {
    instance = _instance_;
    //console.log(instance.io);
    var logger = instance.getLogger(PLUGIN_NAME);
    logger.info("Running...");
  },
  "hooks": {
    "client:js": "",
    "client:events": function () {
      return TEMPLATE_CHANGE_EVENT;
    },
    "server:middleware": middleware
  }
};

const defaults = {
  selector: "[ng-app]"
};

/**
 * Allow run-time modifications to the client-side script
 * @param opts
 */
module.exports = function (opts) {
  //var config   = merger.set({simple: true}).merge(defaults, opts);
  var clientJs = require("fs").readFileSync(__dirname + CLIENT_JS, "utf-8");
  plugin.hooks["client:js"] = clientJs;/*.replace("%SELECTOR%", config.selector);*/
  return plugin;
};


var logger = function () {};
var instance;


function middleware() {
  return function(req, res, next) {
    setTimeout(function() {
      console.log('server: hey!');
      instance.io.sockets.emit(TEMPLATE_CHANGE_EVENT);
      logger('Hello!');
    }, 1000);
    return next();
  }
}

middleware.setLogger = function (newLogger) {
  logger = newLogger || function () {};
};

