'use strict';

var assert = require('assert');
var fileChanger = require('../lib/fileChanger');
var fs = require('fs');

describe('File changer', function () {
  it('should append run injector.', function() {
    var fileContent = fs.readFileSync('example/src/app/index.module.js', 'utf8');

    var injectorContent = fs.readFileSync('client/runInjector.js');
    assert(fileContent.length > 0, 'Content length should be more then 0');

    var newContent = fileChanger.runInjector(fileContent, 'example');
    assert(newContent.length > 0, 'New Content length should be more then 0');

    assert(fileContent+injectorContent, newContent, 'Mock content and runtime content should be equal');

    assert.throws(fileChanger.runInjector);

    assert.throws(function() {
      fileChanger.runInjector(fileContent);
    });
  });

  it('should add template id.', function() {
    var mock = fs.readFileSync('test/mocks/navbar.html', 'utf8'),
        navbarTemplate = fs.readFileSync('example/src/app/components/navbar/navbar.html', 'utf8'),
        markedTemplate = fileChanger.markInjector(navbarTemplate);

    console.log(markedTemplate);
    assert(markedTemplate == mock.replace('%ID%', '1'), 'Templates should match.');
    assert(markedTemplate != navbarTemplate);

    assert(fileChanger.markInjector(navbarTemplate) == mock.replace('%ID%', '2'), 'Templates should match');
    assert.throws(fileChanger.markInjector);
  });
});
