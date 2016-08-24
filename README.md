# DS Recipes

## Dependencies
This project should be built with Node v6.x. The dependencies are listed in package.json.

## Important npm scripts
There are other useful scripts in package.json but these will get you started:

* `npm install` Installs all dependencies in package.json
* `npm run build` Bundles the app for non-development deployments
* `npm test` Executes unit tests
* `npm start` Starts the Webpack dev server with React Hot Loader 3 (beta) enabled
* `NODE_ENV=production npm start` Starts a Hapi server and load the app from build/ from the result of running the build script