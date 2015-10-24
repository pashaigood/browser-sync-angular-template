/* global it */
'use strict';

var fs = require('fs');
var assert = require('assert');
var angularTemplate = require('../lib/angularTemplate');
var fileChanger = require('../lib/fileChanger');
var path = require('path');
var options = {
  templates: 'app/**/*.html',
  indexJs: 'index.modules.js'
};

var mockCorrectFileChangeData = {
  path: '/app/navbar/navbar.html',
  event: 'change'
};

var mockIncorrectFileChangeData = {
  path: '/index.html',
  event: 'change'
};



describe('Angular template', function () {

  it('should set options.', function() {
    var newOptions = {};

    assert.doesNotThrow(function() {
      newOptions = angularTemplate.setOption(JSON.parse(JSON.stringify(options)));
    });
    assert.equal(newOptions.templates, '**/' + options.templates);
    assert.equal(newOptions.indexJs, '**/' + options.indexJs);
    options = newOptions;
  });

  it('should catch files by option value "templates".', function() {
    assert(
      angularTemplate.isMatch('/app/main/main.html', options.templates),
      true
    );

    angularTemplate.onFileChange(mockCorrectFileChangeData);
    assert.notEqual(mockCorrectFileChangeData.event, 'change');

    angularTemplate.onFileChange(mockIncorrectFileChangeData);
    assert.equal(mockIncorrectFileChangeData.event, 'change');
  });

  it('should catch index file by option "indexJs".', function() {
    assert(angularTemplate.isMatch('/app/index.modules.js', options.indexJs));
  });

  it('should create correct response for client.', function () {
    fileChanger.id = 3;

    var url = '/app/components/navbar/navbar.html',
        templatePath = 'example/src' + url,
        navbarTemplate = fs.readFileSync(templatePath, 'utf8'),
        lastId = fileChanger.id,
        absolutePath = path.normalize(__dirname + '/../' + templatePath),
        markedTemplate;


    assert(fs.existsSync(absolutePath));
    // Для начала, запросим шаблон, чтобы создался хешь и пометки.
    markedTemplate = angularTemplate.middleware({
      url: url
    })(navbarTemplate);
    assert.equal(angularTemplate.templateHash[url], lastId, 'Template hash should be equal with last fileChanger id.');
    // Потом, запросим ответ at на этот шаблон.
    var res = angularTemplate.createResponse({
      path: absolutePath
    });

    assert.deepEqual(res, {
      selector: '[igat="%ID%"]'.replace('%ID%', lastId),
      template: markedTemplate,
      templateUrl: url
    });

    fileChanger.id = 0;
  });
});
