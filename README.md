The WHO Hand Hygiene Survey is a mobile friendly tool for performing hand hygiene in hospitals in accordance with the [World Health Oragnisation: Five Moments of Hand Hygiene](http://www.who.int/gpsc/tools/Five_moments/en/).

- HTML5, CSS and JavaScript only.
- Works on all modern web browsers:
  - Chrome
  - Firefox
  - Safari
  - IE 9+
- Works on desktop, tablets and mobile devices.
- Uses browser's native [localStorage](http://en.wikipedia.org/wiki/Web_storage#localStorage) for all data.

[![Build Status](https://travis-ci.org/andrewholgate/who-hand-hygiene-survey.svg?branch=master)](https://travis-ci.org/andrewholgate/who-hand-hygiene-survey)

# Technology

- [Bootstrap 3.x](http://getbootstrap.com/) for responsive look-and-feel.
- [jQuery 1.x](https://jquery.com/) for DOM manipulation (1.x is used for older Internet Explorer compatability)
- [BackboneJS 1.x](http://backbonejs.org/) and [UnderscoreJS](http://underscorejs.org/) for managing application logic and visualisation.
- [BackboneJS LocalStorage 1.x](https://github.com/jeromegn/Backbone.localStorage) to allow local storage of data through Backbone.
- [RequireJS 2.x](http://requirejs.org/) for Javascript libary dependency management and optimisation.
- [RequireJS Text 2.x](https://github.com/requirejs/text) for loading HTML templates.

## Development Environment

- [NodeJS](https://nodejs.org/) runtime environment for server-side.
- [Grunt](http://gruntjs.com/) for development task running.

# Standards Used

- Code using JavaScript [Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode).
- Conforms to [jQuery coding style guide](https://contribute.jquery.org/style-guide/js/).
- HTML5 valid.

# Developer Setup

## Installation

You will need to install [NodeJS](https://nodejs.org/download/) and [npm](http://blog.npmjs.org/post/85484771375/how-to-install-npm).

```bash
# Install Grunt CLI for task running.
npm install -g grunt-cli

# Install project.
npm install

# Install functional testing tools
npm install -g phantomjs
npm install -g casperjs

# Build the project
grunt build
```

## Start Application Server

```bash
# Start and watch server.
grunt
```

## Run Tests

```bash
# Run all project tests.
grunt test
```

# TODO

- Add meta data for OG, etc.
- Improve development build.
- Add bookmark images, such as apple-touch-icon-precomposed.
- Functional tests for survey
- Unit tests

## Potential Optimisations

- Remove dependency on jQuery
- Remove dependency on RequireJS
- Remove dependency on RequireJS Text
