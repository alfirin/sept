[![Build Status](https://travis-ci.org/alfirin/sept-web-radio.png)](https://travis-ci.org/alfirin/sept-web-radio)

# Sept Web radio

You can see the heroku deployment project [here](http://sept-web-radio.herokuapp.com/).

Start an awesome app with AngularJS on the front, Yeoman + Socket.io + Express + Node on the back. This
project is an application for a web-radio using [Node.js](http://nodejs.org/‎),
[AngularJS](http://angularjs.org/), [Yeoman](http://yeoman.io/), ... apps that use
web sockets to add real-time functionality.

### Install modules for the application
    npm install

Then in order to package the application and download the bower dependencies run
    grunt

### Running the app

Runs like a typical express app:
    node app.js

### Development/Production mode

Edit the file config/config.js and change the environment variables. Then run
    grunt server

### Running tests
    grunt test

### Package the app for production environment
    grunt

### Receiving updates from upstream

Just fetch the changes and merge them into your project with git.

## Contact

Jade Ronat-Mallie and Jim
