# Nodes Component Starter
[![Build Status](https://travis-ci.org/nodes-frontend/nodes-component-starter.svg?branch=master)](https://travis-ci.org/nodes-frontend/nodes-component-starter) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Coverage Status](https://coveralls.io/repos/nodes-frontend/nodes-component-starter/badge.svg?branch=master&service=github)](https://coveralls.io/github/nodes-frontend/nodes-component-starter?branch=master)

Opinionated boilerplate for Angular 1.x components which enables you to write and test Angular 1.x components written in typescript & bundled with systemJS (SFX). 
## Installation
This will install all you need to get started. Besides the dependencies in package.json, it will automatically install [jspm](http://jspm.io/) for you globally and install jspm dependencies too.  
```bash
npm install
```

## What does this include
  * Semantic-relase
  * Travis CI
  * Typescript
  * Commitizen
  * ng-annotate (adds and removes AngularJS dependency injection annotations)
  * Inline Angular templates
  * [validate-commit-msg](https://github.com/Frikki/validate-commit-message)
  * Karma / Jasmine testing environment
  * Lite-server (live-reload)
  * SCSS environment with autoprefixer
  * [SystemJS (SFX)](https://github.com/systemjs/builder#self-executing-sfx-bundles)
  * Gulp
  * Source maps

## Lite-server
Lite-server is configured to serve, index.html placed in the root of your component with live-reload for specified environment.
### Development
To serve up the un-minified code run following command. This command starts up lite-server and gulp watch task which gives you live-reload when ./dist/component.css, ./dist/component.js or ./index.html is changed:

```bash
npm run serve:dev
```
### Production
To serve minified & bundled code run the following command. This command starts up lite-server and gulp watch task which gives you live-reload when ./dist/component.css, ./dist/component.min.js or ./index.html is changed.

```bash
npm run serve:build
```
## SystemJS (SFX)
SystemJS is configured to build a self-executing bundle. **Consumers of your components are therefore NOT required to use SystenJS.** [Read more](https://github.com/systemjs/builder#self-executing-sfx-bundles)
## Commitizen (optional)
To use commitizen use following command. **Commitizen is optional** and if you don't wanna use commitizen you can just commit as you're used to. You will just need to follow [the AngularJS commit message guidelines.](https://docs.google.com/document/d/1rk04jEuGfk9kYzfqCuOlPTSJw3hEDZJTBN5E5f1SALo)
You can read more about commitizen [here](https://commitizen.github.io/cz-cli/)

```bash
npm run commit
```
## validate-commit-msg
Validates commit messages on each commit according to [the AngularJS commit message guidelines](https://docs.google.com/document/d/1rk04jEuGfk9kYzfqCuOlPTSJw3hEDZJTBN5E5f1SALo)
## Build
To build your component run following command. This command will minify your css, compile (es2015), ensures to annotate your angular dependencies, inline all your templates, bundle and minify your javascript.

```bash
gulp build
```
## Testing

### Single run
```bash
npm run test
```
### Watch
```bash
npm run karma
```