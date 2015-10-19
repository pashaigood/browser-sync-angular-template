var angularTemplate = require('./angularTemplate');
const PLUGIN_NAME = "BrowserSync Angular Template";
const CLIENT_JS = "/../client/client.js";


/**
 * Plugin interface for BrowserSync
 */
var plugin = {
  "plugin:name": PLUGIN_NAME,
  "plugin": angularTemplate,
  "hooks": {
    "client:js": "",
    "server:middleware": angularTemplate
  }
};

//const defaults = {
//  selector: "[ng-app]"
//};

/**
 * Allow run-time modifications to the client-side script
 * @param opts
 */
module.exports = function (opts) {
  //var config   = merger.set({simple: true}).merge(defaults, opts);
  angularTemplate.setOption(opts);
  var clientJs = require("fs").readFileSync(__dirname + CLIENT_JS, "utf-8");
  plugin.hooks["client:js"] = clientJs.replace("%EVENT%", angularTemplate.TEMPLATE_CHANGE_EVENT);
  return plugin;
};
