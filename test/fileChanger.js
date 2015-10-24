'use strict';

var assert = require('assert');
var fileChanger = require('../lib/fileChanger');
var fs = require('fs');

describe('File changer', function () {
  it('should append run injector.', function() {
    var moduleName = 'example';
    var fileContent = fs.readFileSync('example/src/app/index.module.js', 'utf8');

    assert.throws(fileChanger.runInjector);

    assert.throws(function() {
      fileChanger.runInjector(fileContent);
    });

    var injectorContent = fs.readFileSync('client/runInjector.js', 'utf8');
    var newContent = fileChanger.runInjector(fileContent, moduleName);

    assert.equal(
      fileContent + injectorContent.replace('%MODULE_NAME%', moduleName),
      newContent,
      'Mock content and runtime content should be equal'
    );
  });

  it('id should increase, only when mark injector does not get id.', function() {
    var input = '<div />',
        expectOutput = '<div igat="%ID%" />';

    assert.equal(fileChanger.markInjector(input), expectOutput.replace('%ID%', 0));
    assert.equal(fileChanger.markInjector(input), expectOutput.replace('%ID%', 1));

    assert.equal(fileChanger.markInjector(input, 0), expectOutput.replace('%ID%', 0));
    fileChanger.id = 0;
  });

  it('should add template id.', function() {
    var mock = fs.readFileSync('test/mocks/navbar.html', 'utf8'),
        navbarTemplate = fs.readFileSync('example/src/app/components/navbar/navbar.html', 'utf8'),
        markedTemplate = fileChanger.markInjector(navbarTemplate);
    assert.throws(fileChanger.markInjector);

    assert(markedTemplate == mock.replace('%ID%', '0'), 'Templates should match.');
    assert(markedTemplate != navbarTemplate);

    assert(fileChanger.markInjector(navbarTemplate) == mock.replace('%ID%', '1'), 'Templates should match.');
  });
});
