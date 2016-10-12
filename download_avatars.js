// require http.js and mkdirp to create a directory for the images.

var httpHandling = require('./httphandling');
var mkdirp = require('mkdirp');

// take input from commmand line.

var input = process.argv.slice(2);

// assign them to constants, mainly for readability.

const ownerInput = input[0];
const repoInput = input[1];

// these inputs go to http module where most of the
// processing occurs.

if (input.length === 2) {

  var mkdirp = require('mkdirp');

  mkdirp('avatars', function (err) {
    if (err) console.error(err);
    else console.log('Created folder /avatars or folder already exists.');
  });

  httpHandling(ownerInput, repoInput);

  } else {

  console.log("Incorrect amount of arguments.  Please pass two arguments\n\n");
  console.log("node.js download_avatars.js owner repo\n\n");

  }