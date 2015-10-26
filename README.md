# browser-sync-angular-template
<br />
[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> browserSync plugin for updating angular template without page reload.


## Install

```sh
$ npm install --save browser-sync-angular-template
```


## Usage

```js
// gulpfile.js
var browserSync = require('browser-sync');
var browserSyncAngularTemplate = require('browser-sync-angular-template');

browserSync.use(
  browserSyncAngularTemplate({
    templates: '/app/**/*.html',
    indexJs: 'index.module.js',
    moduleName: 'example'
  })
);
```

## API

browserSyncAngularTemplate(options)

### options
Type: ```Object```

#### templates
Type: ```String```

Pattern for templates files. They will be injected in runtime.

default: **/*.html

#### indexJs
Type: ```String```

Plugin injects the starting script in this file in runtime.

default: index.js

#### moduleName
Type: ```String```

Module name. Used for get the access to required providers.

default: require(bower.json || package.json).name

## TODO

* E2e tests.
* Create a smart injector.
* Improve my english.

## License

Apache-2.0 © [Pavel Belugin](https://github.com/pashaigood)


[npm-image]: https://badge.fury.io/js/browser-sync-angular-template.svg
[npm-url]: https://npmjs.org/package/browser-sync-angular-template
[travis-image]: https://travis-ci.org/pashaigood/browser-sync-angular-template.svg?branch=master
[travis-url]: https://travis-ci.org/pashaigood/browser-sync-angular-template
[daviddm-image]: https://david-dm.org/pashaigood/browser-sync-angular-template.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/pashaigood/browser-sync-angular-template
[coveralls-image]: https://coveralls.io/repos/pashaigood/browser-sync-angular-template/badge.svg
[coveralls-url]: https://coveralls.io/r/pashaigood/browser-sync-angular-template
