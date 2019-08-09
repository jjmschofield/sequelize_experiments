# node-typescript-starter
[![CircleCI](https://circleci.com/gh/jjmschofield/node-typescript-starter/tree/master.svg?style=shield)](https://circleci.com/gh/jjmschofield/node-typescript-starter/tree/master)
[![Coverage Status](https://coveralls.io/repos/github/jjmschofield/node-typescript-starter/badge.svg?branch=master)](https://coveralls.io/github/jjmschofield/node-typescript-starter?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/jjmschofield/node-typescript-starter/badge.svg?targetFile=package.json)](https://snyk.io/test/github/jjmschofield/node-typescript-starter?targetFile=package.json)

A handy boilerplate for building NodeJs applications in Typescript.

The objective of this project is to give you a sensible starting point to start building out services from. 
Some things (like the selection of Javascript superset, test framework and code style) are intentionally opinionated, however as far as possible flexibility has been considered
to allow you to bend the template to meet your requirements.

In terms of the development stack, here are some buzz words for you:
* Typescript (with Tslint based on the Airbnb styleguide)
* Jest (unit and integration test support)
* Docker
* .editorconfig and IntelliJ config
* CircleCI

This starter also drops in a few libraries to help you get moving more quickly:
* Koa middleware and factory 
  * Helps you bootstrap a minimalistic and secure web serivce with error handling and logging
* A centralized multi-transport logger with Correlation Id
  * Provides a very easy to use logging interface
  * Allows you to stream log events to multiple transports
  * Provides a Correlation ID solution to tie events across multiple microservices 
* Basic configuration management using `.env` files  

[src/app.ts](src/server/app.ts) and [src/server/server.ts](src/server/app.ts) are an example of how to compose all of this together. 
Everything is designed to be modular and replaceable, allowing you to rip out and replace the pieces you don't want in your stack. 
These libraries may be extracted into separate npm packages if they become sufficiently mature in future.

For development documentation see the [contributing guide](CONTRIBUTING.md). 

## Getting Started
Once you have copied or cloned the contents of this repo into your project directory:

```
$ npm install
$ cp .env.example .env
$ npm start
```

You can check that tests are setup correctly by using:
```
$ npm run test:unit
```

You can run in a suitable dev mode (file watching, debugging) with:
```
$ npm run start:dev
```
### Git Hooks
If you would like to use the provided git hooks to ensure the sanity of your code base at each commit do:
```
$ cp .hooks/pre-commit .hooks/pre-push .git/hooks
$ chmod +x .git/hooks/pre-commit .git/hooks/pre-push
``` 
Pre-commit will run a lint and tests on each ts file in a commit.

Pre-push will run the full suite of linting and unit tests.


## Typescript
The project is setup already to do TypeScript transpilation. 

A build will result in transpiled files being output into `dist`.

Some sensible defaults are provided, but once you have copied this starter go ahead and make any changes you need over in the [tsconfig.json]()

[source-map-support](https://www.npmjs.com/package/source-map-support) is included to provide accurate source information in any logged stack traces.

## Jest
Jest is setup and ready for you to use with any of the following commands:
```
$ npm run test:unit
$ npm run test:unit:coverage
$ npm run test:int
```
Test file names are expected in the following formats:
* Unit Tests: `<file path>/<file name>.test.ts`
* Integration Tests: `<file path>/<file name>.test.int.ts`

Reports will be output to `tests/reports`.

## Docker
An example Dockerfile is provided to get you started quickly if you want to run your service as a container.

To run your service as a container do:
```
$ docker build -t node-ts-starter .
$ docker run -p 3000:54535 node-ts-starter
```

Go ahead and play with the [Dockerfile]() to your hearts content and modify [.dockerignore]() as you need.

`docker-compose` is also made available, with two configurations:
 * `docker-compose.yml` default, intended to pull an image from docker hub versioned by a commit sha
 * `docker-compose.local.yml` for local dev work, will build the image for you
 
A convenience npm script is included for local builds:
```
$ npm run docker:local up
``` 

To use an image from docker hub do:
```
$ export IMAGE_TAG=<commit sha> && docker-compose up
```
For example:
```
$ export IMAGE_TAG=216d5637c48d10ee66d54cfd373b333fbf63a67e && docker-compose up
```

Docker compose will also bind to port 3000 on your local machine, so you can run integration tests against the built container.

## CircleCI
The boilerplate includes a CircleCI configuration configurable in `.circleci/config.yml`. CircleCI is a fantastic solution for open source projects (it's free) and has a powerful pipeline built around docker images.

The build will do the following:

* Get and cache dependencies (if your `package.json` doesn't change, your dependencies be re-used between builds)
* Fan out
  * Build the project
  * Run unit tests (and upload coverage to coveralls) 
  * Run linter
* Fan in
  * Build docker container
  * Publish docker container to docker hub
  * Run integration tests against docker container

If you are using a public repo, this will result in the following resources being made public:
* [Build Result](https://circleci.com/gh/jjmschofield/node-typescript-starter/tree/master)
* [Coverage Report](https://coveralls.io/github/jjmschofield/node-typescript-starter?branch=master)

### How to Setup Circle CI

In order to get the CI solution working for your project you will need to go through the following steps:

1. Create a CircleCI Account and connect it to your VCS
1. Create a Coveralls Account and connect it to your VCS
1. Create a Docker Hub Account
1. Add your repository to Coveralls and record the repository token
1. Add your repository to CircleCI (your build will fail)
1. Add the following environment variables in CircleCI
  * `COVERALLS_REPO_TOKEN` = The coveralls repository token from earlier
  * `DOCKER_HUB_USER` = Your Docker Hub username
  * `DOCKER_HUB_PASSWORD` = Your Docker Hub password

Finally you should update the badges at the top of this `README.md`

## Tslint 
Tslint is in place to keep your code style standardised and to help protect against common bad practices.

The ruleset in use is based on the very popular [Airbnb styleguide](https://github.com/airbnb/javascript). 

If you don't like these rules you can change them in [tslint.json](tslint.json).

## Editorconfig and IntelliJ config
To make adhereing to the styleguide simpler, configurations for most IDE's are provided in [.editorconfig].

For Intellij or Webstorm users in particular, you'll find some sensible configuration options committed and shared tasks.

## Starter Libraries
Common functionality (for example Koa app construction, logging an configuration from a .env file) are provided under `src/lib`.

These libraries are designed to operate independently and when composed together by your application.

### Config
A very simple wrapper around [dotenv-safe](https://www.npmjs.com/package/dotenv-safe).

Place a `.env` file in the root of your project, this can be changed per environment very easily.

If any variables are already defined in the environment before reading from `.env`, they will not be overwritten - you can use this to load in secrets from your CI solution.
 
This simple solution does not give you the ability to bring in secrets from a key management store (eg Azure Keyvault or AWS KMS), though conceivably your could set them to process.env once they have been recovered.

You should load this config as early as possible in the lifecycle of your application.

To use it simply do:
```
import config from './lib/config';

const main = async () => {
  await config.load(); 
};

(async () => {
  try {
    await main();
  }
  catch (error) {
    process.exit(1);
  }
})();
```

### Koa
A set of middleware useful to get started quickly with Koa.

A factory is provided which composes the middleware in a common pattern.

Working in tandem with the logging library it can be used as follows:
```
import http from 'http';
import https from 'https';
import { createDefaultApp } from './lib/koa';
import { logRequest } from './lib/logger/middleware/koa';

const app = createDefaultApp({ requestLogger: logRequest });

http.createServer(app.callback()).listen(80);
https.createServer(app.callback()).listen(443);
```
This will give you a Koa application configured with the following middleware:

* errorHandler
  * Ensures status codes are set when exceptions and response bodies are empty when application errors are encountered
  * Can be used as a template for more complicated error handling if required
* setCorrelationId
  * Sets a correlation id using the [correlation-id](https://www.npmjs.com/package/correlation-id) package. Works well with `src/lib/logger` which always calls `correlation-id` when logging.
  * In order to send the correlation ID onto another service or message queue, simply do `correlator.getId()` within the call stack for a request
* setReqTime
  * Calculates the request time for each request and sets it as the `X-Response-Time` header

Optionally the factory takes a request logger, `logRequest` from `/lib/logger/middleware/koa` is a good candidate.

Helmet and Cors are also in use, and can take configurations passed in through the factories configuration object.

Alternatively, you can import and use the individual factory functions used by the default factory as you see fit - or use the middleware directly, depending on your preference and/or use case.

#### SSL
The project is setup to serve over HTTP and HTTPS using a self signed certificate.

A self signed certificate is provided in `./cert` and can be changed with:
```
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```

For production use this certificate should be replaced a certificate issued from a root certificate authority. 
You can get one from [Let's Encrypt](https://letsencrypt.org).

It is suggesteed that you do not commit your certificate to source control but instead that you: 
A) Inject it through your see
B) Use a secret management service to retrieve it during process start 

### Health
A simple library and endpoint are provided to provide system info, which can be used as a heartbeat and for on demand monitoring.

**NOTE:** You should protect this endpoint with authentication as it reveals important information about your server. 

# Remaining Work
* Tests
* Koa router / sub router implementation
* Koa input sanitation and validation pattern implementation
* Multi-transport logger
* Add PM2
* Handle far away file names in import
* Protect health 
