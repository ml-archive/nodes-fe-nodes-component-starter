# Nodes Component Starter
[![Build Status](https://travis-ci.org/nodes-frontend/nodes-component-starter.svg?branch=master)](https://travis-ci.org/nodes-frontend/nodes-component-starter) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Coverage Status](https://coveralls.io/repos/nodes-frontend/nodes-component-starter/badge.svg?branch=master&service=github)](https://coveralls.io/github/nodes-frontend/nodes-component-starter?branch=master)

Opinionated boilerplate for Angular 1.x components which enables you to write and test Angular 1.x components written in typescript & bundled with systemJS (SFX).

Uses travis-ci and semantic-relase to help automating releases following the semver pattern, which automatically updates the gh-page following successful builds on travis.

Everything related to releasing beautiful gh-pages is covered for you, we have set up an Angular demo-app, added some commonly used documentation ui-components and a sprinkle of css and awesomeness.

## Before we start
First thing you are going to need is a name for your package! Make sure it's available on the npm registry.

Sweet! Now, before we continue, you will need accounts on these sites:
- https://travis-ci.org/
- https://www.npmjs.com/
- (optional) https://coveralls.io/

Make sure travis-ci has access to your project repo.

We are using a few tools, you will need to install these:
```
$ npm install -g semantic-release-cli jspm typings
```

## Setting up
Clone this repo into a new folder, or download and extract it and set up git.

We have a few lines we will need to change to point to our own package, make sure to update these files:

**package.json**
-
- - it is **important** that you update all git related values (repository url, bugs url)
 
**deploy. sh**
-
- - it is **important** that you update all git related values (username, email, repository path)

Good, now we can set up semantic-release:
```
$ semantic-release-cli setup
```
Fill in the details and authenticate yourself, this will then setup travis-ci and webhooks on github.

It has one drawback though, it will replace some important lines which you need to re-add:

**package.json**
-

change:
```
{
    ...
    "scripts": {
        ...
        "semantic-release": "semantic-release pre && npm publish && semantic-release post",
        ...
    }
}
```
to:
```
{
    ...
    "scripts": {
        ...
        "semantic-release": "semantic-release pre && npm publish && semantic-release post && npm run docs",
        ...
    }
}
```
_add the `npm run docs` command_

**.travis.yml**
-

change:
```
after_success:
- npm run semantic-release
```
to:
```
after_success:
- npm run semantic-release
- npm run coveralls (optional)
- bash deploy.sh
```
_add the `bash deploy.sh` task, and optionally the `npm run coveralls`

## Installation

Lets get our dependencies installed:
```
$ npm install && npm run setup
```
This will install our npm packages, jspm packages and fetch typescript definitions using typings.

## Verify

To verify that everything is set up we can do the following:

**your angular module**
-
- Start a browsersync server by running `$ npm run serve:docs` - this will open the index.html in the docs folder and start the demoApp with your Angular module loaded.

**travis-ci**
-
- go to https://travis-ci.org/ and make sure your repository is listed
 
**gh-pages**
-
- Before we start having travis-ci update our gh-page, let's manually push our documentation files by running `$ gulp docs:gh-pages`. This will build your Angular module and bundle, prepare your documentation and push this budle to your gh-pages branch. Verify that its okay by visiting: https://YOUR_NAME.gitub.io/YOUR_REPOSITORY.

**semantic-release + travis-ci**
-
The last thing we recommend is making sure that the automated releases works. Because of the changes we have made throughout the set-up and install phases, we should have a few files we can commit for our first release. Read more on the commit conventions later on, if you are unfamiliar with it you can commit using this format (which should create a 1.0.0 release):
```
$ git commit -m 'fix: Initial setup'
```

Holy smokes, did you keep the travis-ci site up and follow along in the log? If nothing major failed, then at the very end of the log you should be able to see that travis ran three commands (two if you left coveralls integration out):
- `npm run semantic-relase`
- (optional) `npm run coveralls`
- `bash deploy.sh`

Click on the "after_succes.x" button in the log, which will expand and show you the log output from running these tasks. Let's not worry about the coveralls task, as this will fail if you did not add your repo to coveralls.io. But the other two should both be succesfull. If both of them ran, everything should be a-ok! Go check out your releases on github, you should see a 1.0.0 release. NICE!

## Thats it!

So thats it for the set-up and how to use the automated CI. From here on out it's up to you to get creative.

### folder structure
```
|- .publish (used by gulp docs:gh-pages as a temporary storage when deploying to gh-pages) *
|- coverage (coveralls code-coverage report) *
|- dist (your bundled Angular module for consumers of your package)
|- docs (this is where you document and show off your Angular module, files this folder and the dist folder will be bundled when deploying to gh-pages)
|- jspm_packages *
|- node_modules *
|- release (used by travis-ci and the deploy.sh script as a temporary storage when deploying to gh-pages) *
|- src (the typescript sources of your module, along with templates and scss styles)
|- test (your unit tests resides in this folder)
|- typings *
```

\* this folder is ignored in .gitignore


### validate-commit-msg
Validates commit messages on each commit according to [the AngularJS commit message guidelines](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit)

### SystemJS
SystemJS is configured to build a self-executing bundle. **Consumers of your components are therefore NOT required to use SystenJS.** [Read more about self executing bundles here](https://github.com/systemjs/builder#self-executing-sfx-bundles)

### Commitizen (optional)
To use commitizen run the following command:
```
$ npm run commit
```
**Commitizen is optional** and if you don't want to use commitizen you just need to follow [the AngularJS commit message guidelines.](https://docs.google.com/document/d/1rk04jEuGfk9kYzfqCuOlPTSJw3hEDZJTBN5E5f1SALo)
You can read more about commitizen [here](https://commitizen.github.io/cz-cli/)

### nDocs

nDocs, included in the docs folder, is a set of Angular modules to help you build awesome gh-pages. To make full use of these modules, you need to update the following Angular Constants:
```
angular.module('nDocs')
		.constant('GITHUB', {
			URL: 'https://api.github.com/repos',
			CLIENT_ID: 'GITHUB OAUTH APP CLIENT ID',
			CLIENT_SECRET: 'GITHUB OAUTH APP CLIENT SECRET',
			NAME: 'YOUR GITHUB NAME',
			REPOSITORY: 'YOUR REPOSITORY'
		});
	angular.module('nDocs')
		.constant('NPM', {
			URL: 'https://www.npmjs.com/package',
			NAME: 'YOUR PACKAGE NAME'
		});
	angular.module('nDocs')
		.constant('COMPONENT', {
			MODULE_NAME: 'YOUR ANGULAR MODULE NAME'
		});
```

When you open up the initial documentation using BrowserSync, you will be able to read about the individual modules and how to configure them.

## Testing

Single run
```bash
npm run test
```
Watch
```bash
npm run karma
```

## Contributors
**Big-up** to the people who has helped build this boilerplate:

- [ahlarsen](https://github.com/ahlarsen)
- [dennishn](https://github.com/dennishn)
- [krislm](https://github.com/krislm)
 

Feel free to fork and change this boilerplate to your needs. We've found that this setup works really well for us.