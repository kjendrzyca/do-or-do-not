A simple todo app built with:
- [create-react-app](https://github.com/facebookincubator/create-react-app)
- [redux-saga](https://github.com/redux-saga/redux-saga)
- [express](https://expressjs.com/)
- [mongodb](https://www.mongodb.com/)

Tested with the latest node (7.10.0 at the time of this writing).

## Available Scripts

In the project directory, you can run:

### `npm start`

Uses `concurrently` to run the app alongside with server in the development mode (both in watch mode).<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
Uses `create-react-app` proxy functionality to handle CORS.

Uses super simple basic auth using env variabes (secures only `/api` requests):

1. `REACT_APP_PASS` for the client code
2. `PASS` for the server

Those two need to match.

**Note: Cleans up db with every rebuild and seeds with data if there is none!**

### `npm test`

Launches the test runner in the interactive watch mode.<br>

Running wit `--verbose` flag by default.

To see the code coverage run the command with `--coverage` flag:

`npm test -- --coverage`

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `now-start`

Starting script for [now](https://zeit.co/now) (uses static server).
Needs to be deployed with `CONNECTION_STRING` node env variable to connect with mongodb:

`now -e CONNECTION_STRING=user:pass@host:port/db`

`express` is used to serve client code in this case.

**Note: seeds db with fake data if there is none!**

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

More info in the [Create React App docs](https://github.com/facebookincubator/create-react-app).
