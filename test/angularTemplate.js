/* global it */
'use strict';

var assert = require('assert');
var angularTemplate = require('../lib/angularTemplate');
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

  it('should set options', function() {
    var newOptions = {};

    assert.doesNotThrow(function() {
      newOptions = angularTemplate.setOption(JSON.parse(JSON.stringify(options)));
    });
    assert.equal(newOptions.templates, '**/' + options.templates);
    assert.equal(newOptions.indexJs, '**/' + options.indexJs);
    options = newOptions;
  });

  it('should catch files by option value "templates"', function() {
    assert(
      angularTemplate.isMatch('/app/main/main.html', options.templates),
      true
    );

    angularTemplate.onFileChange(mockCorrectFileChangeData);
    assert.notEqual(mockCorrectFileChangeData.event, 'change');

    angularTemplate.onFileChange(mockIncorrectFileChangeData);
    assert.equal(mockIncorrectFileChangeData.event, 'change');
  });

  it('should catch index file by option "indexJs"', function() {
    assert(angularTemplate.isMatch('/app/index.modules.js', options.indexJs));
  });
});
