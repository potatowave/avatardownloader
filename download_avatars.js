// require http.js

var httpHandling = require('./httphandling');

// take input from commmand line.

var input = process.argv.slice(2);

// assign them to constants, mainly for readability.

const ownerInput = input[0];
const repoInput = input[1];

// these inputs go to http module where most of the
// processing occurs.

if (input.length === 2) {

  httpHandling(ownerInput, repoInput);

} else {

console.log("Incorrect amount of arguments.  Please pass two arguments\n\n");
console.log("node.js download_avatars.js owner repo\n\n");

};