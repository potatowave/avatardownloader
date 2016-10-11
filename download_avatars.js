// require http.js.
var http = require('./http');

// take input from commmand line.

input = process.argv.slice(2);

// assign them to constants, mainly for readability.

const ownerInput = input[0];
const repoInput = input[1];

// these inputs go to http module where most of the
// processing occurs.

http(ownerInput, repoInput);

// end